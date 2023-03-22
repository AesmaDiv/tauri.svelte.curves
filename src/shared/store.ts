import type { Writable } from "stream";
import { writable } from "svelte/store";
import type { Point, IChartData } from "./types";

export const CurrentMousePosition = writable({ x: 0, y: 0 });
export const ChartData = writable({
  coord0: { x: 0, y: 0 },
  coordX: { x: 1, y: 0 },
  coordY: { x: 0, y: 1 },
  points: []
})
export let Mode = writable(1);