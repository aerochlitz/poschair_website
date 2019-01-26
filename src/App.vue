<template>
  <div id="app">
        <Child></Child>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Child from './components/Component.vue';
import data,{ SIGNALS } from './services/websocket';

@Component({
  components: {
    Child
  },
})
export default class App extends Vue {
  constructor() {
    super();
    data.register(SIGNALS.ERROR, this.error);
  }

  private error(msg: string) {
    alert(msg);
  }
}
</script>

<style>

html, body { 
  height: 100%;
}

</style>
