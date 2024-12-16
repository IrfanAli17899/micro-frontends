// let's create a custom event emitter named as pubsub
export class PubSub {
//   private static subscribers: Record<string, Function[]> = {};
  static subscribers: Record<string, Function[]> = {};

  static subscribe(event: string, callback: Function) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  static publish(event: string, data?: any) {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event].forEach((callback) => callback(data));
  }

  static unsubscribe(event: string, callback: Function) {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event] = this.subscribers[event].filter((cb) => cb !== callback);
  }

  static clear(event: string) {
    if (this.subscribers[event]) {
      this.subscribers[event] = [];
    }
  }

  static clearAll() {
    this.subscribers = {};
  }
}

declare global {
  interface Window {
    PubSub: typeof PubSub;
  }
}

window.PubSub = PubSub;