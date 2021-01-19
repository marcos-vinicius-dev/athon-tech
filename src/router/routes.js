
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'crimeCreate',
        component: () => import('layouts/InternalLayout.vue'),
        children: [
          {
            path: '',
            name: 'CrimeCreate',
            meta: {
              title: 'Crime Create'
            },
            component: () => import('pages/CrimeCreate.vue')
          }
        ]
      },
      {
        path: 'crimeDetails/:crimeId',
        component: () => import('layouts/InternalLayout.vue'),
        children: [
          {
            path: '',
            meta: {
              title: 'Crime Details'
            },
            component: () => import('pages/CrimeDetails.vue')
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
