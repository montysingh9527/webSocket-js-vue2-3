
const routes = [
  {
    path: '/',
    component: () => import('src/App.vue'),
    redirect: { name: "/" },
    children: [
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
