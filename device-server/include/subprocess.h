#ifndef JETSON_SERVER_SUBPROCESS_H
#define JETSON_SERVER_SUBPROCESS_H

#include <pthread.h>

typedef struct Subprocess {
  int in_pipe[2];
  int out_pipe[2];
  pthread_t thread;
} Subprocess;

void start_subprocess(Subprocess *sp, const char *cmd);

#endif
