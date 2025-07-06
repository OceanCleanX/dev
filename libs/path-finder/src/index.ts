import {
  CAMERA_HEIGHT,
  FOCAL_LENGTH_X,
  FOCAL_LENGTH_Y,
  PRINCIPLE_POINT,
} from "./constants";
import { propertyCache } from "./utils";

import type { BasePoint } from "./types";

// Point class represents a point in a 2D space with additional properties
// and methods to calculate its 3D coordinates, angle, and distance.
// All properties are cached
class Point implements BasePoint {
  constructor(
    public x: number,
    public y: number,
  ) {}

  @propertyCache()
  get Z(): number {
    return (CAMERA_HEIGHT * FOCAL_LENGTH_Y) / (this.y - PRINCIPLE_POINT.y);
  }

  @propertyCache()
  get X(): number {
    return ((this.x - PRINCIPLE_POINT.x) * this.Z) / FOCAL_LENGTH_X;
  }

  @propertyCache()
  get angle(): number {
    return Math.atan2(this.X, this.Z);
  }

  @propertyCache()
  get distance(): number {
    return Math.hypot(this.X, this.Z);
  }
}

// p is bottom left corner of the frame
type Frame = {
  p: Point;
  w: number;
  h: number;
};

// find closest point to the camera from a list of frames
const findPath = (frames: Frame[]) =>
  frames
    .map(({ p: { x, y }, w, h }) => new Point(x + w / 2, y + h / 2))
    .sort((a, b) => a.distance - b.distance)
    .at(0);

export { Point, findPath };
export type { Frame };
