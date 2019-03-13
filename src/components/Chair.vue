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
    <h3 class="postureType">{{ sensorData.words }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import data, { SIGNALS, SensorData } from "../services/websocket";

@Component({})
/* b: back, s: seat */
export default class Chair extends Vue {


  constructor() {
    super();
    data.register(SIGNALS.SENSOR_DATA, this.sensorString);
    data.register(SIGNALS.DONE, this.gotDone);


    // setTimeout(() => {
    //   this.sensorData.bTopL = 1;
    //   this.sensorData.bTopR = 1;
    //   this.sensorData.bBtmL = 0;
    //   this.sensorData.bBtmR = 0;
    //   this.sensorData.sTopL = 0;
    //   this.sensorData.sTopR = 0;
    //   this.sensorData.sBtmL = 1;
    //   this.sensorData.sBtmR = 1;
    // }, 1000);
  }

  private sensorString(sData: string) {
    console.log(sData);
    this.parseSensorData(sData);
  }

  private gotDone() {
    this.sensorData.words = "Waiting for sensor data";
  }

  private sensorData: SensorData = {
    bTopL: 2,
    bTopR: 2,
    bBtmL: 2,
    bBtmR: 2,
    sTopL: 2,
    sTopR: 2,
    sBtmL: 2,
    sBtmR: 2,
    words: "Waiting for sensor data"
  };

  private parseSensorData(sData: string) {
    // string format: [0, 0, 0, 0, 0, 0, 0, 0] Posture type"
    var postureWords = sData.slice(25);
    var parsedString = sData.slice(1,23).split(", ", 8);
    this.sensorData.bTopL = Number(parsedString[5]);
    this.sensorData.bTopR = Number(parsedString[4]);
    this.sensorData.bBtmL = Number(parsedString[7]);
    this.sensorData.bBtmR = Number(parsedString[6]);
    this.sensorData.sTopL = Number(parsedString[2]);
    this.sensorData.sTopR = Number(parsedString[3]);
    this.sensorData.sBtmL = Number(parsedString[0]);
    this.sensorData.sBtmR = Number(parsedString[1]);
    this.sensorData.words = postureWords;
  }

  private getColor(sensorVal: number) {
    if (sensorVal == 1) { // green
      return `background: rgb(0, 255, 0)`;
    } else if (sensorVal == 0) { // red
      return `background: rgb(255, 0, 0)`;
    } else { // gray
      return `background: rgb(128, 128, 128)`;
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

.postureType {
  text-align: center;
  padding: 20px;
}

</style>

