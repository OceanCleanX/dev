import {
  CAMERA_HEIGHT,
  FOCAL_LENGTH_X,
  FOCAL_LENGTH_Y,
  PRINCIPLE_POINT,
} from "./constants";

import type { BasePoint } from "./types";

class Point implements BasePoint {
  constructor(
    public x: number,
    public y: number,
  ) {}

  get Z(): number {
    return (CAMERA_HEIGHT * FOCAL_LENGTH_Y) / (this.y - PRINCIPLE_POINT.y);
  }

  get X(): number {
    return ((this.x - PRINCIPLE_POINT.x) * this.Z) / FOCAL_LENGTH_X;
  }

  get angle(): number {
    return Math.atan2(this.X, this.Z);
  }

  get distance(): number {
    return Math.hypot(this.X, this.Z);
  }
}

export default Point;
