import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import User from "./views/User"
import UserDetails from "./views/UserDetails"

Vue.config.productionTip = false
Vue.use(VueRouter);

Vue.filter("addressFormat", function (value) {
    if (value == null) {
        return "";
    }
    return `${value.suite} ${value.street}, ${value.city}, ${value.zipcode}`;
});

const routes = [
    {
        path: "/",
        name: "User Listing",
        component: User
    },
    {
        path: "/users/:id",
        name: "User Details",
        component: UserDetails
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');

export default router;
