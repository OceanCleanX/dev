import type { BasePoint } from "./types";

/*
 * Camera parameters
 * Physical distances are in terms of meters
 * Points are in terms of pixels
 */
export const CAMERA_HEIGHT = 0.5;
export const PRINCIPLE_POINT: BasePoint = { x: 320, y: 240 };
export const FOCAL_LENGTH_X = 800;
export const FOCAL_LENGTH_Y = 800;
