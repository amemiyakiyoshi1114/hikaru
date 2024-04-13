<template>
  <div class="main">
    <el-container style="width: 100%;" class=layout-container-demo>
      <el-header style="text-align: right; font-size: 12px;height:50px;">
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
          <p>hikaru</p>
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
                  <el-menu-item :index="{ path: '/project/list' }">list
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="change">
                  <el-menu-item :index="{ path: '/project/create' }">create</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><icon-menu /></el-icon>scenario
                </template>
                <el-menu-item-group>
                  <template #title>view</template>
                  <el-menu-item :index="{path: '/scenario/list'}">list</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="change">
                  <el-menu-item :index="{path: '/scenario/create'}">create</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><setting /></el-icon>administration
                </template>
                <el-menu-item-group>
                  <template #title>view</template>
                  <el-menu-item index="/administration/list">list</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="change">
                  <el-menu-item index="/administration/create">create</el-menu-item>
                  <el-menu-item index="/administration/administrate">administrate</el-menu-item>
                </el-menu-item-group>               
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <el-icon><setting /></el-icon>report
                </template>
                <el-menu-item-group>
                  <template #title>view</template>
                  <el-menu-item index="/report/list">list</el-menu-item>
                </el-menu-item-group>            
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script  setup>

</script>

  <style >
  .main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}

  body,html{
		height: 100%;
	}
  body>.el-container {
		margin-bottom: 40px;
		height: 100%;
	}
  .layout-container-demo{
    width: 100% !important; /* 设置容器宽度为整个视口宽度，并提高优先级 */
  }
.layout-container-demo .el-header {
  width: 100% !important; /* 设置容器宽度为整个视口宽度，并提高优先级 */
  display: flex;
  position: relative;
  height: 100%;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.el-header{
  display: flex;
  position: relative;
  width: 800px;
  height: 300px;
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
    width: auto;
  overflow: auto; /* 添加滚动条以处理内容溢出 */
  flex: 1;
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: right;
  justify-content: right;
  height: 100%;
  right: 20px;
}
</style>
