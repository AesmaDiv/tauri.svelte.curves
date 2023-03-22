<script lang="ts">
  import Options from './lib/Options.svelte';
  import Chart from './lib/Chart.svelte';
  import Logger from './lib/Logger.svelte';
</script>

<main class="container">
  <h1>Welcome to Tauri!</h1>


  <div class="row">
    <div class="column">
      <Chart/>
      <Logger/>
    </div>
    <Options/>
  </div>


</main>

<style>
  
</style>