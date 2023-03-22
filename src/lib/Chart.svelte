<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { CurrentMousePosition, ChartData } from "../shared/store";
  import type { Point, IChartData } from "../shared/types";


  const onMouseMove = (event: MouseEvent) => {
    CurrentMousePosition.set(getCanvasCoord(event));
  }

  const onClick = (event: MouseEvent) => {
    ChartData.update(value => { return { ...value, coord0: getCanvasCoord(event) }});
  }

  const getCanvasCoord = (event: MouseEvent) => {
    const cnv : HTMLCanvasElement = <HTMLCanvasElement>event.target;
    if (!cnv) return;
    const rect : DOMRect = cnv.getBoundingClientRect();
    if (!rect) return;

    return {
      x: Math.trunc(event.clientX - rect.left),
      y: Math.trunc(event.clientY - rect.top)
    }
  }

  const draw = () => {
    console.log("DRAW init...");
    const cnv: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("chart-canvas");
    if (!cnv) return;
    const ctx: CanvasRenderingContext2D = cnv.getContext('2d');
    if (!ctx) return;

    console.log("DRAW rendering...");

    drawAxes(ctx);
    drawPoints(ctx);
  }

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    const c0: Point = $ChartData.coord0;
    console.log(c0);

    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.arc(c0.x, c0.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
  const drawPoints = (ctx: CanvasRenderingContext2D) => {

  }

  ChartData.subscribe(draw);
</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div class="chart-container">
  <canvas id="chart-canvas" class="chart-canvas" on:click={onClick} on:mousemove={onMouseMove}/>
  
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style>
.chart-container {
  width: 70vw;
  height: 60vh;
  border: 1px solid white;
}
.chart-canvas {
  width: 100%;
  height: 100%;
  border: 1px solid green;
  background-image: url('/enc.png');
  background-repeat: no-repeat;
  background-size: contain;
}


</style>