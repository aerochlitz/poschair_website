<template>
  <div class="settings-box">
    <button
      v-on:click="getSettings()"
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
              <select v-model="settings.timeInterval" class="custom-select" id="inputGroupSelectPostureInterval">
                <option selected>Choose new</option>
                <option value="30000">30 seconds</option>
                <option value="60000">1 minute</option>
                <option value="120000">2 minutes</option>
                <option value="300000">5 minutes</option>
              </select>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label
                  class="input-group-text"
                  for="inputGroupSelectVibration"
                >Motor vibration type:</label>
              </div>
              <select v-model="settings.vibrationType" class="custom-select" id="inputGroupSelectVibration">
                <option selected>Choose new</option>
                <option value="short">Short</option>
                <option value="long">Long</option>
                <option value="beep">beep-beep-beep</option>
              </select>
            </div>
            <p>Potentially add snooze</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
            <button v-on:click="setSettings()" type="button" class="btn btn-success" data-dismiss="modal">Save</button>
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
    vibrationType: VibrationType.beep,
    timeInterval: 60 //seconds
  };

  constructor() {
    super();
    data.register(ENDPOINTS.GET_SETTINGS, this.updateSettings);
  }

  private getSettings() {
    data.getSettings();
  }

  private updateSettings(settings: Settings) {
    this.settings = settings;
  }

  private setSettings() {
    data.setSettings(this.settings);
  }
}
</script>

<style>
</style>