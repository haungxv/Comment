import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './views/app.vue';
import createRouter from './router/router.js';

Vue.use(VueRouter);
const router=createRouter();

new Vue({
    router,
    render:(h)=>h(App)
}).$mount("#root");