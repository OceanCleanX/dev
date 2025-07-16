#include <dirent.h>
#include <errno.h>
#include <pthread.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include "cjson/cJSON.h"
#include "log.h"
#include "ws_server/ws.h"
#define STB_DS_IMPLEMENTATION
#include "stb_ds.h"

#include "subprocess.h"

#define PORT 4000
#define MSG_DATA_BUFFER_SIZE 256
#define OUTPUT_BUFFER_SIZE 256
#define SUBPROCESS_DIR "./subprocess"
#define CMD_MAX 64

typedef struct {
  char *key;
  Subprocess value;
} SubprocessEntry;
typedef SubprocessEntry *SubprocessMap;
SubprocessMap subprocesses = NULL;

void *read_subprocess_output(void *arg) {
  Subprocess *sp = (Subprocess *)arg;
  char buffer[OUTPUT_BUFFER_SIZE];
  ssize_t bytes_read;

  while ((bytes_read = read(sp->out_pipe[0], buffer, sizeof(buffer) - 1)) > 0) {
    buffer[bytes_read] = '\0';
    log_debug("Subprocess output: %s", buffer);
    ws_sendframe_txt_bcast(PORT, buffer);
  }

  if (bytes_read == -1)
    log_error("Error reading subprocess output: %s", strerror(errno));

  return NULL;
}

void onopen(ws_cli_conn_t client) {
  char *cli = ws_getaddress(client);
  log_info("Connection opened, addr: %s", cli);
}

void onclose(ws_cli_conn_t client) {
  char *cli = ws_getaddress(client);
  log_info("Connection closed, addr: %s", cli);
}

void onmessage(ws_cli_conn_t client, const unsigned char *msg, uint64_t size,
               int type) {
  if (type != WS_FR_OP_TXT)
    return;

  char *cli = ws_getaddress(client);
  log_debug("Message received from %s, size: %llu", cli, size);

  cJSON *json = cJSON_ParseWithLength((const char *)msg, size);
  const cJSON *t = cJSON_GetObjectItemCaseSensitive(json, "type");
  if (!cJSON_IsString(t))
    return;

  const char *type_str = t->valuestring;
  SubprocessEntry *spe = shgetp_null(subprocesses, type_str);
  if (!spe) {
    log_error("Subprocess '%s' not found", type_str);
    cJSON_Delete(json);
    return;
  }

  char buffer[MSG_DATA_BUFFER_SIZE];
  cJSON *data = cJSON_GetObjectItemCaseSensitive(json, "data");
  if (cJSON_IsInvalid(data)) {
    log_error("Invalid data for subprocess '%s'", type_str);
    cJSON_Delete(json);
    return;
  };
  cJSON_PrintPreallocated(data, buffer, MSG_DATA_BUFFER_SIZE, false);

  Subprocess *sp = &spe->value;

  write(sp->in_pipe[1], buffer, strlen(buffer));
  write(sp->in_pipe[1], "\n", 1);

  cJSON_Delete(json);
}

bool init_subprocesses() {
  DIR *d = opendir(SUBPROCESS_DIR);
  struct dirent *dir;
  char filepath[256];

  if (!d) {
    log_error("Failed to open subprocess directory");
    return false;
  }

  while ((dir = readdir(d)) != NULL) {
    if (dir->d_type == DT_REG) {
      char *filename = strdup(dir->d_name);
      snprintf(filepath, sizeof(filepath), "%s/%s", SUBPROCESS_DIR, filename);

      if (access(filepath, X_OK) != 0) // skip if not executable
        continue;

      shputs(subprocesses, ((SubprocessEntry){.key = filename}));
    }
  }
  closedir(d);

  return true;
}

int main(int argc, char *argv[]) {
  if (!init_subprocesses()) {
    log_error("Failed to initialize subprocesses");
    return EXIT_FAILURE;
  }

  for (size_t i = 0; i < shlenu(subprocesses); i++) {
    SubprocessEntry *entry = &subprocesses[i];
    log_info("Starting subprocess '%s'", entry->key);
    char cmd[CMD_MAX];
    snprintf(cmd, CMD_MAX, SUBPROCESS_DIR "/%s", entry->key);
    start_subprocess(&entry->value, cmd);
    pthread_create(&entry->value.thread, NULL, read_subprocess_output,
                   &entry->value);
  }

  ws_socket(&(ws_server_t){.host = "0.0.0.0",
                           .port = PORT,
                           .thread_loop = 0,
                           .evs.onopen = onopen,
                           .evs.onclose = onclose,
                           .evs.onmessage = onmessage});

  for (size_t i = 0; i < shlenu(subprocesses); i++)
    pthread_join(subprocesses[i].value.thread, NULL);

  shfree(subprocesses);

  return EXIT_SUCCESS;
}
