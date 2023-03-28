<!-------------------------------- ФУНКЦИОНАЛ --------------------------------->
<script lang="ts">
  import { ChartData } from "../shared/store";
  import { parseFloatSafe } from "../shared/common";

  const params = {
    x_min: $ChartData.axisX.min,
    x_max: $ChartData.axisX.max,
    y_min: $ChartData.group1.axis.min,
    y_max: $ChartData.group1.axis.max,
    z_min: $ChartData.group2.axis.min,
    z_max: $ChartData.group2.axis.max,
  }

  const onChange = (event: Event) => {
    ChartData.update(prev => {
      prev.axisX = {
        min: parseFloatSafe(params.x_min),
        max: parseFloatSafe(params.x_max)
      };
      prev.group1.axis = {
        min: parseFloatSafe(params.y_min),
        max: parseFloatSafe(params.y_max)
      };
      prev.group2.axis = {
        min: parseFloatSafe(params.z_min),
        max: parseFloatSafe(params.z_max)
      };
      return { ...prev }
    });
    (<HTMLInputElement>(event.target)).blur();
    console.log($ChartData);
  }

</script>

<!--------------------------------- РАЗМЕТКА ---------------------------------->
<div class="root">
  <span class="title">Параметры осей</span>
  <input class="input-x input-min" type="text" bind:value={params.x_min} on:change={onChange}>
  <span class="label"> &#8804 X &#8804 </span>
  <input class="input-x input-max" type="text" bind:value={params.x_max} on:change={onChange}>
  <input class="input-y input-min" type="text" bind:value={params.y_min} on:change={onChange}>
  <span class="label"> &#8804 Y &#8804 </span>
  <input class="input-y input-max" type="text" bind:value={params.y_max} on:change={onChange}>
  <input class="input-z input-min" type="text" bind:value={params.z_min} on:change={onChange}>
  <span class="label"> &#8804 Z &#8804 </span>
  <input class="input-z input-max" type="text" bind:value={params.z_max} on:change={onChange}>
</div>

<!----------------------------------- СТИЛИ ----------------------------------->
<style>
  .root {
    display: grid;
    grid-template-columns: 35% 20% 35%;
    grid-template-rows: 1fr 1fr 1fr ;
    padding: 5px;
    gap: 5px;
    border: 1px solid white;
  }
  .title {
    grid-column: 1 / 3;
  }
  .input-x {
    grid-row: 2;
  }
  .input-y { 
    grid-row: 3;
  }
  .input-z { 
    grid-row: 4;
  }
  .input-min {
    grid-column: 1;
  }
  .input-max {
    grid-column: 3;
  }
  .label {
    grid-column: 2;
    text-align: center;
  }
</style>