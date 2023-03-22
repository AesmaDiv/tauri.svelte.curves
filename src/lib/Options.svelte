<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { Mode } from "../shared/store";

  const TITLES: string[] = [
    'Установиль ноль',
    'Установить максимум X',
    'Установить максимум Y',
    'Добавление точек'
  ];
  const onChange = (event: any)  => {
    let mode: number = parseInt(
      event.target?.id.replace('curves-option-', ''),
      10
    );
    Mode.set(isNaN(mode) ? -1 : mode);
    console.log($Mode);
  }
  
  
</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div class="options-container">
  {#each TITLES as title, index}
    <label>
      <input id={`curves-option-${index}`}
        type="radio" name="curves-option"
        checked={$Mode == index} 
        on:change={onChange}>
      {title}
    </label>
  {/each}
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style>
.options-container {
  display: flex;
  flex-direction: column;
  align-items: start;

  padding: 10px;
  border: 1px solid white;
}
</style>

