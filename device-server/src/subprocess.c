#include "subprocess.h"

#include <errno.h>
#include <libgen.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "log.h"

#define error_exit(msg)                                                        \
  do {                                                                         \
    log_error(msg ": %s", strerror(errno));                                    \
    exit(EXIT_FAILURE);                                                        \
  } while (0)

#define BASENAME_MAX 64

void start_subprocess(Subprocess *sp, const char *cmd) {
  if (pipe(sp->in_pipe) < 0 || pipe(sp->out_pipe) < 0)
    error_exit("Pipe creation failed");

  pid_t pid = fork();
  if (pid == -1)
    error_exit("Fork failed");

  if (pid == 0) {
    // child
    close(sp->in_pipe[1]);
    close(sp->out_pipe[0]);

    dup2(sp->in_pipe[0], STDIN_FILENO);
    dup2(sp->out_pipe[1], STDOUT_FILENO);

    char cmd_basename[BASENAME_MAX];
    basename_r((char *)cmd, cmd_basename);
    execl(cmd, cmd_basename, NULL);

    log_error("Subprocess '%s' failed: %s", cmd, strerror(errno));
  } else {
    // parent
    close(sp->in_pipe[0]);
    close(sp->out_pipe[1]);
  }
}
