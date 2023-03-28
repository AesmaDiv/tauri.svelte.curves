<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  import { PointMouse, Zoom, ImagePath, ChartImage } from "../shared/store";
  import type { Point } from "../shared/types";

  let root: HTMLDivElement;
  let image: HTMLImageElement;
  let canvas: HTMLCanvasElement;
  let point: Point;

  onMount(() => drawCross());

  const onMouseMove = (new_point: Point) => {
    point = new_point
    zoomBackground();
  }

  // ImagePath.subscribe(val => {
  //   if(!val || !image) return;
  //   image.src = convertFileSrc(val);
  // });

  const zoomBackground = () => {
    if(!canvas || !root || !image) return;
    const rect_root: DOMRect = root.getBoundingClientRect();

    /* Масштабирование изображения */
    const size = {
      width:  $Zoom * $ChartImage.width,
      height: $Zoom * $ChartImage.height,
    }
    /* Смещение изображения */
    const offset = {
      x: (-point.x - 1) * $Zoom + rect_root.width / 2,// * $Zoom ,//-point.x * $Zoom,
      y: (-point.y - 1) * $Zoom + rect_root.height / 2// * $Zoom ,//-point.y * $Zoom
    }
    image.style.setProperty('width', `${size.width}px`);
    image.style.setProperty('height', `${size.height}px`);
    image.style.setProperty('left', `${offset.x}px`);
    image.style.setProperty('top', `${offset.y}px`);
  }

  const drawCross = () => {
    if (!canvas) return;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    ctx.resetTransform();
    ctx.moveTo(0, 0);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
    ctx.moveTo(ctx.canvas.width, 0);
    ctx.lineTo(0, ctx.canvas.height);
    ctx.stroke();
  }

  Zoom.subscribe(zoomBackground);
  PointMouse.subscribe(onMouseMove);
</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div bind:this={root} class="zoom-root">
  <img bind:this={image} class="zoom-image" src="/ecn.png" alt=""/>
  <canvas bind:this={canvas} class="zoom-canvas"/>
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style> 
  .zoom-root {
    box-sizing: border-box;
    width: 100%;
    aspect-ratio: 1;
    /* border: 15px solid white; */
    border-radius: 50%;
    overflow: hidden;
    position: relative;
  }
  .zoom-image { 
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .zoom-canvas {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>