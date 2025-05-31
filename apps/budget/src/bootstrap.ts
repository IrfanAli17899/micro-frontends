import './styles.css';
import { createApp } from 'vue';
import App from './app/App.vue';

export const bootstrap = (container:string) => {
    const app = createApp(App);
    app.mount(container);
};
