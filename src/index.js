import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from "vuex";
import App from './views/app.vue';
import createRouter from './router/router.js';
import createStore from './store/index.js'


Vue.use(VueRouter);
Vue.use(Vuex);

const store=createStore();
const router=createRouter();

new Vue({
    router,
    store,
    render:(h)=>h(App)
}).$mount("#root");