<template>
  <div class="layout-container-demo" style="height: 500px">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu :default-openeds="['4']" :router="true">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><message /></el-icon>project
                </template>
                <el-menu-item-group>
                  <template #title>view</template>
                  <el-menu-item :index="{ path: '/project/list', query: { name: str } }">list
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="change">
                  <el-menu-item index="1-2" @click="toCreate">create</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><icon-menu /></el-icon>scenario
                </template>
                <el-menu-item-group>
                  <template #title>view</template>
                  <el-menu-item index="2-1">list</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="change">
                  <el-menu-item index="2-2">create</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><setting /></el-icon>administration
                </template>
                <el-menu-item-group>
                  <template #title>view</template>
                  <el-menu-item index="3-1">list</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="change">
                  <el-menu-item index="3-2">create</el-menu-item>
                  <el-menu-item index="3-3">administrate</el-menu-item>
                </el-menu-item-group>               
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <el-icon><setting /></el-icon>report
                </template>
                <el-menu-item-group>
                  <template #title>view</template>
                  <el-menu-item index="4-1">list</el-menu-item>
                </el-menu-item-group>            
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <router-view></router-view>
          <el-scrollbar>
            <el-table stripe :data="tableData">
              <el-table-column prop="project" label="project" width="140" />
              <el-table-column prop="create" label="create" width="120" />
              <el-table-column prop="update" label="update" />
            </el-table>
          </el-scrollbar>
          <div class="demo-pagination-block">
            <div class="demonstration"></div>
            <el-pagination
              v-model:current-page="currentPage2"
              v-model:page-size="pageSize2"
              :page-sizes="[100, 200, 300, 400]"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="sizes, prev, pager, next"
              :total="1000"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script  setup>
import { ref } from "vue";
import router from "../router";

const item = {
  project: "2016-05-02",
  create: "Tom",
  update: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));

const currentPage2 = ref(5);
const pageSize2 = ref(100);
const str = ref('bbb');

const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};

const toCreate=()=>{
  router.push({
    path:'/project/list/',
    query:{
      name:str.value
    }
  })
}

</script>

  <style scoped>
.layout-container-demo .el-header {
  display: flex;
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  flex: 0 0 auto;
  position: relative;
  min-width: 200px; /* 设置 el-aside 的最小宽度，根据需要调整 */
  width: auto; /* 允许 el-aside 根据内容扩展宽度 */
  min-height: 500px;
  height: auto; /* 设置固定高度，可以根据需要调整 */
  overflow: auto; /* 添加滚动条以处理内容溢出 */
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
    height: 800px; /* 设置固定高度，可以根据需要调整 */
  overflow: auto; /* 添加滚动条以处理内容溢出 */
  flex: 1;
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
