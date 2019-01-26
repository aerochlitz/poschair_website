
interface Message {
    key: string;
    body: any;
}

export const ENDPOINTS = {
    CONNECT: 'connection',
    REQUEST: 'request'
};

export const SIGNALS = {
    ERROR: 'error'
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

    // A General Request
    public request = (data: string) => {
        this.send(ENDPOINTS.REQUEST, data);
    }

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
