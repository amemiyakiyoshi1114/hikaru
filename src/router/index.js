import { createRouter, createWebHistory } from 'vue-router';
import LoginHome from '../views/LoginHome.vue';
import CommonHome from '@/views/CommonHome.vue';
import ProjectListTable from '@/components/ProjectListTable.vue';
import ProjecCreateForm from '@/components/ProjectCreateForm.vue';
import ScenarioListTable from '@/components/ScenarioListTable.vue';
import ScenarioCreateForm from '@/components/ScenarioCreateForm.vue';

const routes = [
  {
    path: '/',
    name: 'LoginHome',
    component: LoginHome
  },
  {
    path: '/hikaru',
    name: 'CommonHome',
    component: CommonHome,
    children: [
      { path: '/project/list/', component: ProjectListTable },
      { path: '/project/create/',component:ProjecCreateForm},
      { path: '/scenario/list/',component:ScenarioListTable},
      { path: '/scenario/create/',component:ScenarioCreateForm},
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