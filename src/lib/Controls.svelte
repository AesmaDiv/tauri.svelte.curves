<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { open } from '@tauri-apps/api/dialog';
  import { ChartData, Mode, ImagePath } from "../shared/store";
  import { GROUPS } from "../shared/common";
    import { convertFileSrc } from '@tauri-apps/api/tauri';

  const onClear = ()  => ChartData.update(prev => {
    prev[Object.keys(GROUPS)[$Mode - 3]].points = [];
    return {...prev}
  });
  const onSetBackground = () => {
    open({
      multiple: false,
      filters: [{
        name: 'Файл изображения',
        extensions: ['png']
      }]
    }).then((value: string) => ImagePath.set(value ? convertFileSrc(value) : ""));
  }
</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div class="control-root">
  <button on:click={onSetBackground}>Set background</button>
  <button on:click={onClear}>Clear points</button>
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style>
  .control-root {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0px;
  }
</style>