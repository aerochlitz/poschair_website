<template>
  <div class="settings-box">
    <button
      v-on:click="getInterval()"
      type="button"
      class="btn btn-primary"
      id="settingsBtn"
      data-toggle="modal"
      data-target="#settingsModal"
    >Settings</button>
    <button
      v-on:click="restartScript()"
      type="button"
      class="btn btn-primary"
      id="restartBtn"
    >Restart Script</button>
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
                <option value="10">10 seconds</option>
                <option value="20">20 seconds</option>
              </select>
            </div>
            <button
              v-on:click="snooze(15)"
              type="button"
              class="btn btn-primary btn-block"
              data-dismiss="modal"
            >Snooze: 15 seconds</button>
            <button
              v-on:click="recalibrate()"
              type="button"
              class="btn btn-primary btn-block"
              data-dismiss="modal"
            >Re-calibrate sensors</button>
            <button
              v-on:click="shutdown()"
              type="button"
              class="btn btn-primary btn-block"
              data-dismiss="modal"
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
  ENDPOINTS,
  SIGNALS
} from "../services/websocket";

@Component({})
export default class SettingsComponent extends Vue {
  private settings: Settings = {
    timeInterval: 10 //seconds
  };

  constructor() {
    super();
    data.register(ENDPOINTS.GET_INTERVAL, this.updateInterval);
    data.register(SIGNALS.DONE, this.unfreezeUI);
    data.register(SIGNALS.SCRIPT_READY, this.unfreezeUI);
  }

  private unfreezeUI() {
    // enable settings button
    var btn1 = document.getElementById("settingsBtn");
    var btn2 = document.getElementById("restartBtn");

    if (btn1 && btn2) {
      btn1.removeAttribute("disabled");
      btn2.removeAttribute("disabled");
    }
  }

  private freezeUI() {
    // disable settings button
    var btn1 = document.getElementById("settingsBtn");
    var btn2 = document.getElementById("restartBtn");
    if (btn1 && btn2) {
      btn1.setAttribute("disabled", "");
      btn2.setAttribute("disabled", "");
    }
  }

  private getInterval() {
    data.getInterval();
  }

  private updateInterval(intervalTime: number) {
    this.settings.timeInterval = intervalTime;
  }

  private setInterval() {
    data.setInterval(this.settings.timeInterval);
    this.freezeUI();
  }

  private snooze(sleepyTime: number) {
    data.snooze(sleepyTime);
    this.freezeUI();
  }

  private recalibrate() {
    data.recalibrate();
    this.freezeUI();
  }

  private shutdown() {
    data.shutdown();
    // only disable "Settings" button
    var btn1 = document.getElementById("settingsBtn");
    if (btn1) {
      btn1.setAttribute("disabled", "");
    }
  }

  private restartScript() {
    this.freezeUI();
    data.rerun();
  }
}
</script>

<style>
</style>