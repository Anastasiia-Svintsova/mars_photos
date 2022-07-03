import { Camera } from "./Camera";

export interface Rover {
  id: number,
  name: string,
  max_date: string,
  cameras: Camera[],
}
