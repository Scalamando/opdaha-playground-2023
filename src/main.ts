import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import{createVuestic} from "vuestic-ui";
import router from "./router";

import "vuestic-ui/css"
import "./main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(createVuestic({
    config:{
        colors:{
            variables:{
                primary: '#379B52',
                gray: '#767C88',
                gold: '#FDCC0D',
                accent: '#E6ECE7',
                danger: '#FF7A7A',
            }
        }
    }
}))

app.mount("#app");
