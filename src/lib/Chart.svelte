<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { convertFileSrc } from '@tauri-apps/api/tauri';

  import { onMount } from "svelte";
  import type { Point } from "../shared/types";
  import { PointMouse, ChartData, Mode, ImagePath, ChartImage } from "../shared/store";
  import { removeFrom, GROUPS } from "../shared/common";

  let canvas: HTMLCanvasElement;

  onMount(() => resizeCanvas());
  onresize = () => resizeCanvas();

  const DEFAULT_POINT: Point = { x: 0, y: 0 };

  ImagePath.subscribe(val => { if ($ChartImage) $ChartImage.src = val; });

  const resizeCanvas = () => {
    const root = document.getElementById('chart-root');
    if (!root) return;
    const rect = root.getBoundingClientRect();
    canvas.setAttribute('width', `${rect.width}px`);
    canvas.setAttribute('height', `${rect.height}px`);

    drawAll();
  }

  const onMouseMove = (event: MouseEvent) => PointMouse.set(getCoordMouse(event));

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

  const getCoordMouse = (event: MouseEvent): Point => {
    const rect : DOMRect = canvas.getBoundingClientRect();

    return {
      x: Math.trunc(event.clientX - rect.left),
      y: Math.trunc(event.clientY - rect.top)
    };
  }

  const AddRemovePoint = (chart_data: any, group_name: string, point: Point) => {
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
  const drawAll = () => {
    if (!canvas) return;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.resetTransform();

    drawAxes(ctx);
    for(const entry of Object.entries(GROUPS)){
      drawPoints(ctx, ...entry);
    }
  }

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
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
  const drawPoints = (ctx: CanvasRenderingContext2D, group_name: string, color: string) => {
    console.log(group_name, color);
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

  ChartData.subscribe(drawAll);
</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div id="chart-root" class="chart-root">
  <img bind:this={$ChartImage} id="chart-image" class="chart-image" alt='none'/>
  <canvas bind:this={canvas} class="chart-canvas"
    on:mousemove={onMouseMove}
    on:click={onClick}
  />
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style>
  .chart-root {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .chart-canvas {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .chart-image {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>