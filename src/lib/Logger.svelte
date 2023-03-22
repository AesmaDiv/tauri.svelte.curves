<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { CurrentMousePosition } from '../shared/store';

  let text: string = ".blank";
  CurrentMousePosition.subscribe(p => text = `${p.x} ${p.y}`);
</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div class="root">
  <input type="text" class="logger-text" value={text}>
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style>
.root {
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid white;
}
.logger-text {
  width: 10em;
}
</style>