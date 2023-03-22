export type Point = { x: number, y: number };
export interface IChartData {
  coord0 : Point,
  coordX : Point,
  coordY : Point,
  points : Array<Point>
}