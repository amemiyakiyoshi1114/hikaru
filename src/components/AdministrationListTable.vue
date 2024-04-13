<template>
  <el-cascader
    :props="props"
    @change="finallyChange"
  />
  <el-button type="primary" @click="onSelect">select</el-button>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="username" label="username" sortable width="180" />
    <el-table-column prop="projectName" label="projectName" sortable width="180" />
    <el-table-column prop="scenarioName" label="scenarioName" sortable />
    <el-table-column prop="times" label="times" sortable/>
    <el-table-column prop="state" label="state" />
    <el-table-column prop="id" label="id" />
    <el-table-column prop="createTime" label="createTime" sortable/>
    <el-table-column prop="updateTime" label="updateTime" sortable/>
    <el-table-column prop="administrationName" label="administrationName" sortable/>
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
  
  <script  setup>
import { ref, onMounted } from "vue";
import {
  onGetProjectList,
  onGetScenarioList,
  onGetAdministrationList,
} from "@/api/axios";
const projectData = ref([
  {
    username: "tsubaki",
    projectName: "yourProject",
    id: 1423867906,
    createTime: "2024-04-10T22:27:26",
    updateTime: "2024-04-10T22:27:26",
  },
]);
const scenarioId = ref(1);

onMounted(async () => {
  onGetProjectList().then(
    (res) => {
      const totalProject = res.data.data.data.total;
      onGetProjectList("", "", 1, totalProject).then((res) => {
        projectData.value = res.data.data.data.records;
      });
    },
    (err) => {
      console.log(err);
    }
  );
});

const props = {
  lazy: true,
  lazyLoad: async (node, resolve) => {
    const { level } = node;
    setTimeout(async () => {
      if (level === 0) {
        const projects = projectData.value.map((projectData) => ({
          value: projectData.id,
          label: projectData.projectName,
        }));
        resolve(projects);
      } else if (level === 1) {
        const projectId = node.value;
        console.log("project",node.value);
        try {
          // 使用 await 等待异步操作完成,需要将lazyload设置为async的，并且确保 getScenarioDataSync 函数正确地返回了 Promise，并且 lazyLoad 函数正确地等待了异步操作的完成。
          const scenarioData = await getScenarioDataSync(projectId);
          console.log("Scenario Data:", scenarioData);

          if(scenarioData.length === 0){
            resolve([])
          }

          const scenarios = scenarioData.map((scenario) => ({
            value: scenario.id,
            label: scenario.scenarioName,
            leaf:true
          }));
          resolve(scenarios);
        } catch (error) {
          console.error("Error fetching scenario data:", error);
          resolve([]);
        }
      } else {
        resolve([]);
      }
    }, 1000);
  },
};

const getScenarioDataSync = async (projectId) => {
  try {
    const res = await onGetScenarioList(projectId, "", "", 1, 1);
    const totalScenario = res.data.data.data.total;
    console.log('total', totalScenario);
    const scenarioRes = await onGetScenarioList(projectId, "", "", 1, totalScenario);
    console.log('res', scenarioRes);
    return scenarioRes.data.data.data.records;
  } catch (error) {
    console.error("Error fetching scenario data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

const finallyChange = (value) => {
  scenarioId.value = value[1];
  console.log("最后的选择", scenarioId.value);
};

const tableData = ref([]);
const keyword = ref("");
const orderBy = ref("update_time");
const currentPage = ref(1);
const pageSize = ref(1);
const totalNumber = ref(10);

const small = ref(false);
const background = ref(false);
const disabled = ref(false);
async function GetAdministrationList(scenarioId,keyword,orderBy,pageNum,pageSize){
    onGetAdministrationList(scenarioId,keyword,orderBy,pageNum,pageSize).then(
        res =>{
            tableData.value = res.data.data.data.records;
            setTimeout(() => {
        totalNumber.value = res.data.data.data.total; // 更新 total 值
      }, 800); // 延迟时间为 200 毫秒，根据实际情况调整
      console.log("table data");
      console.log(res);
        },err => {console.log(err)}
    )
}
const onSelect = () => {
  GetAdministrationList(scenarioId.value, "", "", 1, 1);
};

const handleSizeChange = (val) => {
  pageSize.value = val;
  console.log(pageSize.value);
  GetAdministrationList(
    scenarioId.value,
    keyword.value,
    orderBy.value,
    currentPage.value,
    pageSize.value
  );
};
const handleCurrentChange = (val) => {
  currentPage.value = val;
  console.log(currentPage.value);
  console.log(scenarioId.value);
  GetAdministrationList(
    scenarioId.value,
    keyword.value,
    orderBy.value,
    currentPage.value,
    pageSize.value
  );
};
</script>
  