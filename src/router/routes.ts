import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'interviews', component: () => import('src/pages/Interviews.vue') },
      { path: 'candidates', component: () => import('src/pages/Candidates.vue') },
      { path: 'allinterns', component: () => import('src/pages/AllInterns.vue') },
      { path: 'pending', component: () => import('src/pages/Pending.vue') },
      { path: 'oldnew', component: () => import('src/pages/Oldnew.vue') },
      {
        path: 'intern/:id',
        name: 'Intern',
        component: () => import('src/components/Intern.vue')
      },
      { path: 'stats', component: () => import('components/Stats.vue') },
      { path: 'test', component: () => import('components/TestComponent.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
