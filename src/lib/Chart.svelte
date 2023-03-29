<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { onMount } from "svelte";
  import type { Point } from "../shared/types";
  import { PointMouse, ChartData, Mode, Zoom, ImagePath, ImageSize } from "../shared/store";
  import { removeFrom, GROUPS } from "../shared/common";

  let root: HTMLDivElement;
  let canvas: HTMLCanvasElement;

  onMount(() => resizeCanvas());
  onresize = () => resizeCanvas();


  ChartData.subscribe(drawAll);
  ImagePath.subscribe(val => {
    if (!canvas) return;
    canvas.style.setProperty('background-image', `url("${val}")`);
  });


  const onMove = (event: MouseEvent) => PointMouse.set(getCoordMouse(event));
  const onWheel = (event: WheelEvent) => Zoom.update(val => {
    const zoom = val + event.deltaY * 0.01;
    return (zoom > 1 && zoom < 10) ? zoom : val;
  });
  const onClick = (event: MouseEvent) => {
    const coord: Point = getCoordMouse(event);
    switch ($Mode) {
      case 0: {
        ChartData.update(prev => { return { ...prev, coord0: coord }});
        ChartData.update(prev => { return { ...prev, coordX: {
          x: $ChartData.coordX.x,
          y: coord.y
        }}});
        ChartData.update(prev => { return { ...prev, coordY: {
          x: coord.x,
          y: $ChartData.coordY.y 
        }}});
        Mode.update(mode => mode + 1);
      } break;
      case 1: {
        coord.y = $ChartData.coord0.y;
        ChartData.update(prev => { return { ...prev, coordX: coord }});
        Mode.update(mode => mode + 1);
      } break;
      case 2: {
        coord.x = $ChartData.coord0.x;
        ChartData.update(prev => { return { ...prev, coordY: coord }});
        Mode.update(mode => mode + 1);
      } break;
      default: {
        ChartData.update(prev => AddRemovePoint(prev, Object.keys(GROUPS)[$Mode - 3], coord));
      }
    }
  }


  function resizeCanvas() {
    if (!canvas || !root) return;
    const rect = root.getBoundingClientRect();
    canvas.setAttribute('width', `${rect.width}px`);
    canvas.setAttribute('height', `${rect.height}px`);
    ImageSize.set({ width: rect.width, height: rect.height });

    drawAll();
  }
  function getCoordMouse(event: MouseEvent): Point {
    const rect : DOMRect = canvas.getBoundingClientRect();

    return {
      x: Math.trunc(event.clientX - rect.left),
      y: Math.trunc(event.clientY - rect.top)
    };
  }
  function AddRemovePoint(chart_data: any, group_name: string, point: Point) {
    let result = {...chart_data};
    let points: Array<Point> = result[group_name].points;

    const found = points.findIndex((p: Point) => 
      Math.abs(p.x - point.x) < 5 &&
      Math.abs(p.y - point.y) < 5
    );

    if (found > -1) { 
      points = removeFrom(points, found);
    } else {
      points.push(point);
    }
    result[group_name].points = points.sort((a:Point, b:Point) => b.x - a.x);

    return result;
  }


  function drawAll() {
    if (!canvas) return;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.resetTransform();

    drawAxes(ctx);
    for(const entry of Object.entries(GROUPS)){
      drawPoints(ctx, ...entry);
      drawCurve(ctx, entry[0]);
    }
  }
  function drawAxes(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 3;

    ['coord0', 'coordX', 'coordY'].forEach(prop => {
      const coord = $ChartData[prop]
      ctx.beginPath();
      ctx.moveTo(coord.x, coord.y);
      ctx.arc(coord.x, coord.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    })

    ctx.beginPath();
    ctx.moveTo($ChartData.coordX.x, $ChartData.coordX.y);
    ctx.lineTo($ChartData.coord0.x, $ChartData.coord0.y);
    ctx.lineTo($ChartData.coordY.x, $ChartData.coordY.y);
    ctx.stroke();
    
  }
  function drawPoints(ctx: CanvasRenderingContext2D, group_name: string, color: string) {
    $ChartData[group_name].points.forEach((point: Point) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.moveTo(point.x, $ChartData.coord0.y);
      ctx.lineTo(point.x, $ChartData.coordY.y);
      ctx.stroke();
    })
  }
  function drawCurve(ctx: CanvasRenderingContext2D, group_name: string) {
    const points = $ChartData[group_name].points;
    if (points.length < 4) return;
    ctx.moveTo(points[0].x, points[0].y);

    let i: number = 0;
    for (i = 1; i < points.length - 2; i ++)
    {
      var xc = (points[i].x + points[i + 1].x) / 2;
      var yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);
    ctx.stroke();
  }

</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div bind:this={root} class="chart-root">
  <canvas bind:this={canvas} class="chart-canvas"
  on:mousemove={onMove}
  on:wheel={onWheel}
  on:click={onClick}
  />
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style>
  .chart-root {
    width: 100%;
    height: 100%;
  }
  .chart-canvas {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>