<template>
  <el-select
    v-model="value"
    value-key="id"
    placeholder="Select"
    style="width: 240px"
  >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.projectName"
      :value="item"
    />
  </el-select>
  <el-button type="primary" @click="onSelect">select</el-button>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="username" label="username" sortable width="180" />
    <el-table-column prop="projectName" label="projectName" sortable width="180" />
    <el-table-column prop="scenarioName" label="scenarioName" sortable />
    <el-table-column prop="githubPrepositoryUrl" label="githubPrepositoryUrl" sortable/>
    <el-table-column prop="branch" label="branch" />
    <el-table-column prop="credentialsId" label="credentialsId" />
    <el-table-column prop="testClass" label="testClass" sortable/>
    <el-table-column prop="id" label="id" />
    <el-table-column prop="createTime" label="createTime" sortable/>
    <el-table-column prop="updateTime" label="updateTime" sortable/>
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
  <p>
    selected option's description:
    {{ value ? value.id : "no select" }}
  </p>
</template>
<script  setup>
import { ref, onMounted } from "vue";
import { onGetProjectList,onGetScenarioList } from "@/api/axios";

const value = ref(null);
const options = ref([]);
const totalProject = ref(1);
const keyword = ref("");
const orderBy = ref("update_time");
const currentPage = ref(1);
const pageSize = ref(1);
const totalNumber = ref(10);

const small = ref(false);
const background = ref(false);
const disabled = ref(false);

onMounted(async () => {
  onGetProjectList().then(
    (res) => {
      // currentPage.value = res.data.data.data.cuurent;
      // pageSize.value = res.data.data.data.size;
      //totalNumber.value = res.data.data.data.total;
      // 获取 total 值
     // console.log(res);
      totalProject.value = res.data.data.data.total; // 更新 total 值
      // console.log("project total:");
      // console.log(totalProject.value);
      onGetProjectList("", "", 1, totalProject.value).then(
        (res) => {
          //console.log(res);
          options.value = res.data.data.data.records;
          // console.log("options.value");
          // console.log(options.value);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    (err) => {
      console.log(err);
    }
  );
});

async function getScenarioList(projectId,keyword, orderBy, pageNumber, pageSize) {
  onGetScenarioList(projectId,keyword, orderBy, pageNumber, pageSize).then(
    res =>{
      tableData.value = res.data.data.data.records;
      setTimeout(() => {
        totalNumber.value = res.data.data.data.total; // 更新 total 值
      }, 400); // 延迟时间为 200 毫秒，根据实际情况调整
      console.log("table data");
      console.log(res);
    },
    err =>{
      console.log(err);
    }
  );
}
const tableData = ref([]);
const onSelect =() => {
   getScenarioList(value.value.id,keyword.value,orderBy.value,currentPage.value,pageSize.value);
};


const handleSizeChange = (val) => {
  pageSize.value = val;
  console.log(pageSize.value);
  getScenarioList(
    value.value.id,
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
  getScenarioList(
    value.value.id,
    keyword.value,
    orderBy.value,
    currentPage.value,
    pageSize.value
  );
};

</script>