import { createRouter, createWebHistory } from 'vue-router';
import LoginHome from '../views/LoginHome.vue';
import CommonHome from '@/views/CommonHome.vue';
import ProjectListTable from '@/components/ProjectListTable.vue';
const routes = [
  {
    path: '/hikaru',
    name: 'LoginHome',
    component: LoginHome
  },
  {
    path: '/',
    name: 'CommonHome',
    component: CommonHome,
    children: [
      { path: '/project/list/', component: ProjectListTable },
    ]

  },
  {
    path:'/project/list',
    name:'projectList',
    component:ProjectListTable
  }
  // 可以添加更多的路由配置
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;