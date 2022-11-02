import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/onboarding',
    component: () => import('layouts/OnboardingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/OnboardingPage.vue') },
    ],
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/new/journey',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'NewJourney',
        component: () => import('src/pages/JourneyItemPage.vue'),
      },
    ],
  },

  {
    path: '/edit/:id/journey',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'EditJourney',
        component: () => import('src/pages/JourneyItemPage.vue'),
      },
    ],
  },

  {
    path: '/schedule',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SchedulePage.vue') }],
  },

  {
    path: '/new/schedule',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'NewSchedule',
        component: () => import('src/pages/ScheduleFormPage.vue'),
      },
    ],
  },

  {
    path: '/edit/:id/schedule',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'EditSchedule',
        component: () => import('src/pages/ScheduleFormPage.vue'),
      },
    ],
  },

  {
    path: '/basic-beliefs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BasicBeliefPage.vue') },
    ],
  },

  {
    path: '/basic-beliefs/chapter/:chapterId/question/:questionId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BasicBeliefDetailPage.vue') },
    ],
  },

  {
    path: '/bible',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/BiblePage.vue') }],
  },

  {
    path: '/bible/chapter/:chapterId/verse/:verseId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BibleDetailPage.vue') },
    ],
  },

  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SettingsPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
