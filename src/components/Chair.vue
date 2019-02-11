<template>
    <div class="chair-box">
        <img src="public/chair.jpg" alt="Chair">
        <table class="chair-sensors">
            <tr>
                <td v-bind:style="getColor()">{{ data.bTopL }}</td>
                <td>o</td>
                <td>o</td>
            </tr>
            <tr>
                <td> </td>
                <td>o</td>
                <td>o</td>
            </tr>
            <tr>
                <td>o</td>
                <td>o</td>
                <td> </td>
            </tr>
            <tr>
                <td>o</td>
                <td>o</td>
                <td> </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { SensorData } from '../services/websocket';

@Component({})
export default class Chair extends Vue {
    private data: SensorData = {
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
            this.data.bTopL = 100;
        }, 3000);
    }

    private getColor() {
        return `background: rgb(${Math.floor(255*this.data.bTopL/100)}, 0, 0)`;
    }
}
</script>

<style>

table.chair-sensors {
    position: absolute;
    top: 300px;
    left: 500px;
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

