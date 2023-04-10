const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: { name: "login" },
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("src/pages/Login.vue"),
      },
      {
        path: "home",
        name: "home",
        component: () => import("src/pages/Home.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
