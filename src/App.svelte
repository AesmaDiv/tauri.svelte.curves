<script lang="ts">
  import Options from './lib/Options.svelte';
  import Chart from './lib/Chart.svelte';
  import Coords from './lib/Coords.svelte';
  import AxesParams from './lib/AxesParams.svelte';
  import Zoom from './lib/Zoom.svelte';
  import PointsList from './lib/PointsList.svelte';

  import { PointMouse, PointChart } from './shared/store';
  import { GROUPS } from './shared/common';
  import Controls from './lib/Controls.svelte';

</script>

<main class="app-root">
  <div class="app-grid">
    <div class="app-grid-item chart">
      <Chart/>
    </div>
    <div class="app-grid-item info">
      {#each Object.keys(GROUPS) as group}
        <PointsList groupName={group}/>
      {/each}
    </div>
    <div class="app-grid-item panel">
      <Options/>
      <AxesParams/>
      <Coords title={"Координаты канваса"} source={PointMouse}/>
      <Coords title={"Значения графика"} source={PointChart}/>

      <Controls/> 
    </div>
    <div class="app-grid-item zoom">
      <Zoom/>
    </div>
  </div>
</main>

<style>
  .app-root {
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
    box-sizing: border-box;
    outline: 2px solid white;
    overflow: hidden;
  }
  .app-grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto 230px;
    grid-template-rows: auto 230px;
    padding: 5px;
    gap: 10px;
    box-sizing: border-box;
    outline: 1px solid wheat;
  }
  .app-grid-item {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .chart {
    grid-column: 1;
    grid-row: 1;
    outline: 1px solid green;
  }
  .info {
    display: flex;
    gap: 20px;
    grid-column: 1;
    grid-row: 2;
    outline: 1px solid blue;
  }
  .panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
    grid-column: 2;
    grid-row: 1;
    outline: 1px solid red;
    position: relative;
  }
  .zoom {
    grid-column: 2;
    grid-row: 2;
    outline: 1px solid yellow;
  }
</style>