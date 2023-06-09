export type Point = { x: number, y: number };
export interface IChartData {
  coord0 : Point,
  coordX : Point,
  coordY : Point,
  points : Array<Point>
}
export type GroupData = {
  axis_min: number,
  axis_max: number,
  points: Array<Point>
}