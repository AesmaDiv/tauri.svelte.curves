import { writable, type Writable } from "svelte/store";

export const PointMouse = writable({ x: 0, y: 0 });
export const PointChart = writable({ x: 0, y: 0 });
export const ChartData = writable({
  coord0: { x:  0, y:  0 },
  coordX: { x: 10, y:  0 },
  coordY: { x:  0, y: 10 },
  axisX:  { min: 0, max: 100 },
  group1: {
    axis: { min: 0, max: 100 },
    points: []
  },
  group2: {
    axis: { min: 0, max: 120 },
    points: []
  }
})
export let ImagePath: Writable<string> = writable('');
export let Mode: Writable<number> = writable(0);
export let Zoom: Writable<number> = writable(4.0);
export let ChartImage: Writable<HTMLImageElement> = writable(undefined);
