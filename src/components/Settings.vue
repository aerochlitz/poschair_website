<template>
    <div>
        <button type="button" v-bind:class="getClass()" v-on:click="settings()">Settings</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Settings extends Vue {
    private btnClass: string = 'btn-success';

    constructor() {
        super();
    }

    private getClass() {
        return `btn-settings btn ${this.btnClass}`;
    }

    private settings() {
        this.btnClass = 'btn-danger';
    }
}
</script>

<style>

</style>