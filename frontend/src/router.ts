import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { useMainStore } from "@/stores";

const routes: Array<RouteRecordRaw> = [
    {
        component: () => import("@/views/SplashPage.vue"),
        path: "/",
        meta: { guest: true },
    },
    {
        component: () => import("@/views/AgreePage.vue"),
        path: "/agree",
        meta: { requiresAuth: true },
    },
    {
        component: () => import("@/views/HomePage.vue"),
        path: "/home",
        meta: { requiresAuth: true, requiresAgree: true },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    const main = useMainStore();
    if (!main) {
        next();
        return;
    }
    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !main.isAuthenticated
    ) {
        next("/");
        return;
    }
    if (
        to.matched.some((record) => record.meta.requiresAgree) &&
        !main.isAgreed
    ) {
        next("/agree");
        return;
    }
    next();
});

export default router;
