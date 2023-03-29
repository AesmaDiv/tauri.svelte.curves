<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { ChartData } from "../shared/store";
  import { translatePoint } from "../shared/common";
  import type { Point } from "../shared/types";

  export let groupName: string = "group1";

  let values = [];

  ChartData.subscribe(prev => {
    values = prev[groupName].points.map(
      (point: Point) => translatePoint($ChartData, groupName, point)
    );
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