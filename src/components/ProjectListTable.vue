<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="createTime" label="Date" sortable  width="180" />
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="projectName" label="projectName" sortable/>
    <el-table-column prop="updateTime" label="updateTime" sortable/>
    <el-table-column prop="username" label="username" />
  </el-table>
  <div class="pagination-container">
  <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[1, 2, 3, 4]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="totalNumber"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</div>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
import { onGetProjectList } from "../api/axios";
const tableData = ref([]); //必须使用此种方式
const keyword = ref("");
const orderBy = ref("update_time");
const currentPage = ref(1);
const pageSize = ref(1);
const totalNumber = ref(10);

const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val) => {
  pageSize.value = val;
  console.log(pageSize.value);
  getProjectList(
    keyword.value,
    orderBy.value,
    currentPage.value,
    pageSize.value
  );
};
const handleCurrentChange = (val) => {
  //console.log(`current page: ${val}`);
  currentPage.value = val;
  console.log(currentPage.value);
  getProjectList(
    keyword.value,
    orderBy.value,
    currentPage.value,
    pageSize.value
  );
};

onMounted(async () => {
  getProjectList("", "", 1, 1);
});

async function getProjectList(keyword, orderBy, pageNumber, pageSize) {
  onGetProjectList(keyword, orderBy, pageNumber, pageSize).then(
    (res) => {
      tableData.value = res.data.data.data.records;
      // currentPage.value = res.data.data.data.cuurent;
      // pageSize.value = res.data.data.data.size;
      //totalNumber.value = res.data.data.data.total;
      // 延迟更新 total 值
      setTimeout(() => {
        totalNumber.value = res.data.data.data.total; // 更新 total 值
      }, 200); // 延迟时间为 200 毫秒，根据实际情况调整
      console.log("table data");
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
  // 在这里编写您想要触发的函数逻辑
 // console.log("函数被触发了！");
}
</script>
<style>
.pagination-container {
  float: right;
}
</style>