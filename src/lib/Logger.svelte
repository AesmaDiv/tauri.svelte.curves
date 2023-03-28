<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { PointMouse } from '../shared/store';

  let text: string = ".blank";
  PointMouse.subscribe(p => text = `X= ${p.x}  Y= ${p.y}`);
</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div class="root">
  <input class="coords-input" type="text" value={text}>
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style>
  .root {
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid white;
  }
  .coords-input {
    width: 10em;
  }
</style>