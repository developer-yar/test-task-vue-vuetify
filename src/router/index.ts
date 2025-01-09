import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: IndexView,
    children: [
      {
        path: "",
        redirect: "/all",
      },
      {
        path: "/all",
        component: () => import("@/views/AllView.vue"),
      },
      {
        path: "processed",
        component: () => import("@/views/ProcessedView.vue"),
      },
      {
        path: "unprocessed",
        component: () => import("@/views/UnprocessedView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
