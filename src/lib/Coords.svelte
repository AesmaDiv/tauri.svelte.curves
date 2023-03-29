<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { PointMouse } from '../shared/store';

</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div class="root">
  <span class="title">Координаты канваса</span>
  <label class="label">X = <input class="input-coord" type="text" value={$PointMouse.x}></label>
  <label class="label">Y = <input class="input-coord" type="text" value={$PointMouse.y}></label>
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