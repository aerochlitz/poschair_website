<template>
  <div id="app">
    <div class="row">
    </div>
    <div class="row">
      <div class="col-1">
      </div>
      <div class="col">
        <Chair></Chair>
      </div>
      <div class="col">
        <Settings></Settings>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Chair from "./components/Chair.vue";
import Settings from "./components/SettingsComponent.vue";
import data, { SIGNALS } from "./services/websocket";

@Component({
  components: {
    Chair,
    Settings
  }
})
export default class App extends Vue {
  constructor() {
    super();
    data.register(SIGNALS.ERROR, this.error);
  }

  private error(msg: string) {
    alert(msg);
    console.log(msg);
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

</style>
