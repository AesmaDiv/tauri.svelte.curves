<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { onMount } from "svelte";
  import { PointMouse, Zoom, ImagePath, ImageSize } from "../shared/store";
  import type { Point } from "../shared/types";

  let canvas: HTMLCanvasElement;
  let point: Point;

  onMount(() => drawCross());

  Zoom.subscribe(zoomBackground);
  PointMouse.subscribe(onMouseMove);
  ImagePath.subscribe(val => {
    if (!canvas) return;
    /* Загрузка изображения */
    canvas.style.setProperty('background-image', `url("${val}")`)
  });


  function onMouseMove(new_point: Point) {
    point = new_point;
    zoomBackground();
  }


  function zoomBackground() {
    if(!canvas) return;
    /* Масштабирование изображения */
    const size = {
      width:  $ImageSize.width * $Zoom,
      height: $ImageSize.height * $Zoom,
    }
    canvas.style.setProperty('background-size', `${size.width}px ${size.height}px`);
    /* Смещение изображения */
    const rect = canvas.getBoundingClientRect();
    const offset = {
      x: -point.x * $Zoom - 1 + rect.width / 2.0,
      y: -point.y * $Zoom + rect.height / 2.0,
    }
    canvas.style.setProperty('background-position', `${offset.x}px ${offset.y}px`);
  }
  function drawCross() {
    if (!canvas) return;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    ctx.resetTransform();
    ctx.moveTo(0, 0);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
    ctx.moveTo(ctx.canvas.width, 0);
    ctx.lineTo(0, ctx.canvas.height);
    ctx.stroke();
  }

</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<canvas bind:this={canvas} class="zoom-canvas"/>

<!----------------------------------- СТИЛИ ----------------------------------->
<style> 
  .zoom-canvas {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    /* background-size: 600% 600%; */
    background-repeat: no-repeat;
    outline: 1px solid white;
    /* border-radius: 50%; */
  }
</style>