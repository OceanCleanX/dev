BUILD_DIR := build
EXECUTABLE := jetson-server

CC ?= gcc
CFLAGS := -Wall -Wextra -Werror -Wno-unused-parameter
MODE ?= DEBUG
DEBUG_CFLAGS := -g -O0
RELEASE_CFLAGS := -O3 -march=native
ifeq ($(MODE),DEBUG)
	CFLAGS += $(DEBUG_CFLAGS)
else
	CFLAGS += $(RELEASE_CFLAGS)
endif
CFLAGS += -pthread -std=c99

INCLUDE_DIR := include
EXTERNAL_INCLUDE := include/external
LIBS := ws cjson logc
SRCS := $(wildcard src/*.c)
OBJS := $(patsubst src/%.c, $(BUILD_DIR)/%.o, $(SRCS))

CFLAGS += -I$(INCLUDE_DIR) -I$(EXTERNAL_INCLUDE)

LDLIBS := $(patsubst %, -l%, $(LIBS))

.PHONY: all clean $(LIBS)

$(shell mkdir -p $(BUILD_DIR))

all: $(BUILD_DIR)/$(EXECUTABLE)

$(BUILD_DIR)/$(EXECUTABLE): $(OBJS) $(LIBS)
	@echo "Linking $@..."
	$(CC) $(CFLAGS) -L$(BUILD_DIR) $(LDLIBS) -o $(BUILD_DIR)/$(EXECUTABLE) $(OBJS)

$(BUILD_DIR)/%.o: src/%.c
	@echo "Compiling $<..."
	$(CC) $(CFLAGS) -c $< -o $@

ws:
	@echo "Compiling wsServer..."
	make -C ./external/wsServer
	cp ./external/wsServer/libws.a $(BUILD_DIR)/

cjson:
	@echo "Compiling cJSON..."
	make -C ./external/cJSON
	cp ./external/cJSON/libcjson.a $(BUILD_DIR)/

logc:
	@echo "Compiling log.c..."
	$(CC) $(CFLAGS) -c ./external/log.c/src/log.c -o $(BUILD_DIR)/log.o
	ar rcs $(BUILD_DIR)/liblogc.a $(BUILD_DIR)/log.o

clean:
	rm -rf $(BUILD_DIR)
	make -C ./external/wsServer clean
	make -C ./external/cJSON clean
