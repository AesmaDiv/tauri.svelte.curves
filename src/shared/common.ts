import type { Point } from "./types";
import { ChartData } from "./store";

export const GROUPS = {
  group1: "#0000ff", 
  group2: "#ff0000"
};

export function roundTo(value: number, decimals: number) : number {
  const coef = Math.pow(10, decimals);
  return Math.floor(value * coef) / coef;
}
export function parseFloatSafe(value: any) : number {
  let result = parseFloat(value.toString());
  return isNaN(result) ? 0.0 : result;
}
export function removeFrom(array: Array<any>, index: number) : Array<any> {
  const result = array.slice(0, index).concat(array.slice(index + 1));
  return result;
}
export function translatePoint(chart_data: any, group_name: string, point: Point) : Point {
  let [x, y] = [
    point.x - chart_data.coord0.x,
    chart_data.coord0.y - point.y
  ];
  x *= roundTo(
    (chart_data.axisX.max - chart_data.axisX.min) /
    (chart_data.coordX.x - chart_data.coord0.x), 4);
  y *= roundTo(
    (chart_data[group_name].axis.max - chart_data[group_name].axis.min) /
    (chart_data.coord0.y - chart_data.coordY.y), 4);

  return {x, y};
}