
interface Message {
    key: string;
    body: any;
}

export interface SensorData {
    bTopL: number;
    bTopR: number;
    bBtmL: number;
    bBtmR: number;
    sTopL: number;
    sTopR: number;
    sBtmL: number;
    sBtmR: number;
}

export enum VibrationType {
    short = "Short",
    long = "Long"
  }
  
export interface Settings {
    timeInterval: number;
  }
  

export const ENDPOINTS = {
    CONNECT: 'connection',
    GET_INTERVAL: 'getInterval',
    SET_INTERVAL: 'setInterval',
    SNOOZE: 'snooze',
    RECALIBRATE: 'recalibrate',
    SHUTDOWN: 'shutdown'
};

export const SIGNALS = {
    ERROR: 'error',
    SENSOR_DATA: 'sensorData'
};

class DataService {
    private ws: WebSocket = new WebSocket('ws://localhost:8080'); // Server path
    private connected: Promise<any> = Promise.resolve();

    private callbacks: { [key: string]: Array<(...params: any[]) => void> } = {};

    constructor() {
        this.connected = new Promise((resolve) => {
            this.ws.onopen = () => resolve();
        });
        this.ws.onmessage = this.alert;
    }

    public getInterval = () => {
        return this.send(ENDPOINTS.GET_INTERVAL);
    }

    public setInterval = (interval: number) => {
        return this.send(ENDPOINTS.SET_INTERVAL, interval);
    }

    public snooze = (snoozeTime: number) => {
        return this.send(ENDPOINTS.SNOOZE, snoozeTime);
    }

    public recalibrate = () => {
        return this.send(ENDPOINTS.RECALIBRATE);
    }

    public shutdown = () => {
        return this.send(ENDPOINTS.SHUTDOWN);
    }

    // do something when the backend sends a signal. For example on error
    public register = (key: string, callback: (...params: any[]) => void) => {
        if (!this.callbacks[key]) {
            this.callbacks[key] = [];
        }

        this.callbacks[key].push(callback);
    }

    private alert = (msg: MessageEvent) => {
        const data: Message = JSON.parse(msg.data);

        console.info('Message Recieved: ', data.body);
        if (this.callbacks[data.key]) {
            for (const callback of this.callbacks[data.key]) {
                callback(data.body);
            }
        }
    }

    private send = (key: string, body?: any) => {
        this.connected.then(() => {
            this.ws.send(JSON.stringify({ key, body }));
        });
    }
}

export default new DataService();
