<template>
  <div class="chair-box">
    <img class="chair-pic" src="public/chair_crop.jpg" alt="Chair">
    <div class="sensor-grid">
      <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.bTopL)"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.bTopR)"></div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.bBtmL)"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.bBtmR)"></div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.sTopL)"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.sTopR)"></div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.sBtmL)"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.sBtmR)"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { SensorData } from "../services/websocket";

@Component({})
/* b: back, s: seat */
export default class Chair extends Vue {
  private sensorData: SensorData = {
    bTopL: 0,
    bTopR: 0,
    bBtmL: 0,
    bBtmR: 0,
    sTopL: 0,
    sTopR: 0,
    sBtmL: 0,
    sBtmR: 0
  };

  constructor() {
    super();

    setTimeout(() => {
      this.sensorData.bTopL = 1;
      this.sensorData.bTopR = 1;
      this.sensorData.bBtmL = 0;
      this.sensorData.bBtmR = 0;
      this.sensorData.sTopL = 0;
      this.sensorData.sTopR = 0;
      this.sensorData.sBtmL = 1;
      this.sensorData.sBtmR = 1;
    }, 3000);
  }

  private getColor(sensorVal: number) {
    if (sensorVal == 1) {
      return `background: rgb(0, 255, 0)`;
    } else {
      return `background: rgb(255, 0, 0)`;
    }
  }
}
</script>

<style>
.sensor-grid {
  position: absolute;
  top: 20px;
  left: 0px;
  width: 310px;
  align-items: stretch;
}

.row {
  height: 40px;
}

.col {
    border-radius: 100px;

}

.chair-box {
  position: relative;
  min-width: 400px;
  width: 100% !important;
  width: 400px;
}
</style>

