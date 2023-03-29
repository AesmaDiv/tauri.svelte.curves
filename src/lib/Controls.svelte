<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { open } from '@tauri-apps/api/dialog';
  import { ChartData, Mode, ImagePath } from "../shared/store";
  import { GROUPS } from "../shared/common";
  import { convertFileSrc } from '@tauri-apps/api/tauri';


  const onClearPoints = ()  => ChartData.update(prev => {
    if (!prev[Object.keys(GROUPS)[$Mode - 3]]) return prev;
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
  <button on:click={onSetBackground}>Загрузить изображение</button>
  <button on:click={onClearPoints}>Очистить точки</button>
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