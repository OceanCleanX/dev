const PAYLOAD_TEMPLATE = [
  0x55, 0xaa, 0x09, 0x01, 0x01, 0x00, 0x01, 0x01,
  // left motor, to mask
  0x00, 0x00,
  // right motor, to mask
  0x00, 0x00,
  // end of motor data
  0x0c, 0x5a, 0xa5,
];
const SPEED_MIN = 0;
const SPEED_MAX = 1000;

const limitSpeed = (s: number) => Math.max(SPEED_MIN, Math.min(SPEED_MAX, s));
const createPayload = (leftSpeed: number, rightSpeed: number): Uint8Array => {
  const payload = new Uint8Array(PAYLOAD_TEMPLATE);

  leftSpeed = limitSpeed(leftSpeed);
  rightSpeed = limitSpeed(rightSpeed);

  payload[8] = leftSpeed & 0xff;
  payload[9] = (leftSpeed >> 8) & 0xff;
  payload[10] = rightSpeed & 0xff;
  payload[11] = (rightSpeed >> 8) & 0xff;

  return payload;
};

type SocketInfo = {
  raw: Uint8Array;
} & (
  | {
      valid: false;
    }
  | {
      valid: true;
      readonly delay: number;
      readonly voltage: number;
      readonly wifi_strength: number;
      readonly gyro_x: number;
      readonly gyro_y: number;
      readonly gyro_z: number;
    }
);

const bytesToFloat = (first: number, second: number) =>
  parseFloat(`${first}.${second}`);

const parseResponse = (data: Uint8Array): SocketInfo => ({
  raw: data,
  valid:
    data.length == 20 &&
    data[0] == 0x55 &&
    data[1] == 0xaa &&
    data[18] == 0x5a &&
    data[19] == 0xa5,
  get delay() {
    return data[3]!;
  },
  get voltage() {
    return bytesToFloat(data[4]!, data[5]!);
  },
  get wifi_strength() {
    return data[6]!;
  },
  get gyro_x() {
    return bytesToFloat(data[7]!, data[8]!);
  },
  get gyro_y() {
    return bytesToFloat(data[9]!, data[10]!);
  },
  get gyro_z() {
    return bytesToFloat(data[11]!, data[12]!);
  },
});

export { createPayload, parseResponse };
export type { SocketInfo };
