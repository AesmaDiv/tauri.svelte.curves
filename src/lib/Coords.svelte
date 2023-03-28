<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { Point } from '../shared/types';

  export let title: string;
  export let source: Writable<{x: number, y: number}>;

  let coord: Point = { x: 0, y: 0};
  source?.subscribe(p => coord = { x: p.x, y: p.y });
</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div class="root">
  <span class="title">{title}</span>
  <label class="label">X = <input class="input-coord" type="text" value={coord.x}></label>
  <label class="label">Y = <input class="input-coord" type="text" value={coord.y}></label>
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