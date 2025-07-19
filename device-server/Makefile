BUILD_DIR := build
EXECUTABLE := device-server

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

ROOT_DIR := $(shell pwd)
ABS_EXE_PATH := $(abspath $(BUILD_DIR)/$(EXECUTABLE))
SERVICE_FILE := data/device-server.service.in
TARGET_SERVICE_FILE ?= /etc/systemd/system/device-server.service

.PHONY: all clean install $(LIBS)

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

install-service: all
	@echo "Installing service..."
	sed -e "s|@EXECUTABLE@|$(ABS_EXE_PATH)|g" $(SERVICE_FILE) \
		| sed -e "s|@ROOT_DIR@|$(ROOT_DIR)|g" \
		> $(TARGET_SERVICE_FILE)

clean:
	rm -rf $(BUILD_DIR)
	make -C ./external/wsServer clean
	make -C ./external/cJSON clean
