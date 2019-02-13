<template>
  <div class="chair-box">
    <img class="chair-pic" src="public/chair_crop.jpg" alt="Chair">
    <div class="sensor-grid">
      <div class="row">
        <div class="col">o</div>
      </div>
      <div class="row">
        <div class="col">o</div>
      </div>
      <div class="row">
        <div class="col">o</div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.bTopL)"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.bTopR)"></div>
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col">o</div>
      </div>
      <div class="row">
        <div class="col">o</div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.bBtmL)"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.bBtmR)"></div>
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col">o</div>
      </div>
      <div class="row">
        <div class="col">o</div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.sTopL)"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.sTopR)"></div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col">o</div>
        <div class="col" v-bind:style="getColor(sensorData.sBtmL)"></div>
        <div class="col"></div>
        <div class="col" v-bind:style="getColor(sensorData.sBtmR)"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col">o</div>
      </div>
      <div class="row">
        <div class="col">o</div>
      </div>
      <div class="row">
        <div class="col">o</div>
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
    bTopL: 10,
    bTopR: 10,
    bBtmL: 10,
    bBtmR: 10,
    sTopL: 10,
    sTopR: 10,
    sBtmL: 10,
    sBtmR: 10
  };

  constructor() {
    super();

    setTimeout(() => {
      this.sensorData.bTopL = 80;
      this.sensorData.bTopR = 60;
      this.sensorData.bBtmL = 70;
      this.sensorData.bBtmR = 50;
      this.sensorData.sTopL = 100;
      this.sensorData.sTopR = 80;
      this.sensorData.sBtmL = 90;
      this.sensorData.sBtmR = 50;
    }, 3000);
  }

  private getColor(sensorVal: number) {
    return `background: rgba(114, 0, 255, ${sensorVal / 100})`;
  }

}
</script>

<style>

.sensor-grid {
  position: absolute;
  top: 0px;
  left: 0px;
}

td {
  border: 1px solid black;
  text-align: center;
  padding: 20px;
}

.chair-box {
  position: relative;
}
</style>

