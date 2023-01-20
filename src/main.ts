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
                primary: '#0000FF',
                gray: '#767C88',
                gold: '#FDCC0D',
            }
        }
    }
}))

app.mount("#app");
