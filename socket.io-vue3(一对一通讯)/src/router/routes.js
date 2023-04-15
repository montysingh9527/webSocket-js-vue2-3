const routes = [
    {
        path: '/',
        component: () => import('src/App.vue'),
        redirect: { name: 'chatting' },
        children: [
            { path: 'home', component: () => import('src/pages/home.vue') },
            {
                path: 'chatting',
                component: () => import('src/pages/chatting.vue'),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
