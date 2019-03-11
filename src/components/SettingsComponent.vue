<template>
  <div class="settings-box">
    <button
      v-on:click="getInterval()"
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#settingsModal"
    >Settings</button>
    <div
      class="modal fade"
      id="settingsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="settingsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="settingsModalLabel">Settings</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label
                  class="input-group-text"
                  for="inputGroupSelectPostureInterval"
                >Posture check interval:</label>
              </div>
              <select
                v-model="settings.timeInterval"
                class="custom-select"
                id="inputGroupSelectPostureInterval"
              >
                <option value="15">15 seconds</option>
                <option value="30">30 seconds</option>
              </select>
            </div>
            <button
              v-on:click="recalibrate()"
              type="button"
              class="btn btn-outline-primary btn-block"
            >Re-calibrate sensors</button>
            <button
              v-on:click="snooze()"
              type="button"
              class="btn btn-outline-primary btn-block"
            >Snooze</button>
            <button
              v-on:click="shutdown()"
              type="button"
              class="btn btn-outline-primary btn-block"
            >Shut down</button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
            <button
              v-on:click="setInterval()"
              type="button"
              class="btn btn-success"
              data-dismiss="modal"
            >Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import data, {
  Settings,
  VibrationType,
  ENDPOINTS
} from "../services/websocket";

@Component({})
export default class SettingsComponent extends Vue {
  private settings: Settings = {
    timeInterval: 15 //seconds
  };

  constructor() {
    super();
    data.register(ENDPOINTS.GET_INTERVAL, this.updateInterval);
  }

  private getInterval() {
    data.getInterval();
  }

  private updateInterval(intervalTime: number) {
    this.settings.timeInterval = intervalTime;
  }

  private setInterval() {
    data.setInterval(this.settings.timeInterval);
  }

  private snooze() {}

  private recalibrate() {
    data.recalibrate();
  }

  private shutdown() {
    data.shutdown();
  }
}
</script>

<style>
</style>