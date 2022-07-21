import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: '登录'
        },
        component: () => import("@/views/login/index.vue"),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export default router;