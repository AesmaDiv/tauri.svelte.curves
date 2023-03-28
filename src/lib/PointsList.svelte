<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { ChartData } from "../shared/store";
  import { roundTo } from "../shared/common";
  import type { Point } from "../shared/types";

  export let groupName: string = "group1";

  let values = [];

  ChartData.subscribe(prev => {
    values = prev[groupName].points.map((point: Point) => {
      let [x, y] = [
        point.x - $ChartData.coord0.x,
        $ChartData.coord0.y - point.y
      ];
      x *= roundTo(
        ($ChartData.axisX.max - $ChartData.axisX.min) /
        ($ChartData.coordX.x - $ChartData.coord0.x), 4);
      y *= roundTo(
        ($ChartData[groupName].axis.max - $ChartData[groupName].axis.min) /
        ($ChartData.coord0.y - $ChartData.coordY.y), 4);

      return {x, y};
    });
  });
</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div class="root">
  <table>
    <thead>
      <tr>
        <td>X</td>
        <td>Y</td>
      </tr>
    </thead>
    <tbody>
      {#each values as value}
      <tr>
        <td>{value.x.toFixed(4)}</td>
        <td>{value.y.toFixed(4)}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style>
  .root {
    width: 200px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
  }
</style>