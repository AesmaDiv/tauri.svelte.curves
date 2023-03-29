<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { ChartData, PointMouse } from '../shared/store';
  import { translatePoint } from '../shared/common';
  import type { Point } from '../shared/types';

  let coord = { x: 0, y: 0, z: 0 };
  PointMouse.subscribe((point: Point) => {
    const vals_Y = translatePoint($ChartData, 'group1', point);
    const vals_Z = translatePoint($ChartData, 'group2', point);
    coord.x = vals_Y.x;
    coord.y = vals_Y.y;
    coord.z = vals_Z.y;
  })

</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div class="root">
  <span class="title">Значения графика</span>
  <label class="label">X = <input class="input-coord" type="text" value={coord.x}></label>
  <label class="label">Y = <input class="input-coord" type="text" value={coord.y}></label>
  <label class="label">Z = <input class="input-coord" type="text" value={coord.z}></label>
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style>
  .root {
    display: flex;
    flex-direction: column;
    padding: 5px;
    border: 1px solid white;
  }
  .label {
    margin-left: 1em;
  }
  .input-coord {
    width: 6em;
  }
</style>