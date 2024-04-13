<template>
  <el-cascader :props="props" @change="finallyChange" />
  <el-button type="primary" @click="administrateClick">administrate</el-button>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  onGetProjectList,
  onGetScenarioList,
  onGetAdministrationList,
  onAdministrate,
} from "@/api/axios";
import { ElMessage, ElMessageBox } from "element-plus";

const projectData = ref([
  {
    username: "tsubaki",
    projectName: "yourProject",
    id: 1423867906,
    createTime: "2024-04-10T22:27:26",
    updateTime: "2024-04-10T22:27:26",
  },
]);
const administrationId = ref(1);
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
        console.log("project", node.value);
        try {
          // 使用 await 等待异步操作完成,需要将lazyload设置为async的，并且确保 getScenarioDataSync 函数正确地返回了 Promise，并且 lazyLoad 函数正确地等待了异步操作的完成。
          const scenarioData = await getScenarioDataSync(projectId);
          console.log("Scenario Data:", scenarioData);

          if (scenarioData.length === 0) {
            resolve([]);
          }

          const scenarios = scenarioData.map((scenario) => ({
            value: scenario.id,
            label: scenario.scenarioName,
          }));
          resolve(scenarios);
        } catch (error) {
          console.error("Error fetching scenario data:", error);
          resolve([]);
        }
      } else if (level === 2) {
        const scenarioId = node.value;
        console.log("scenarioId", node.value);
        try {
          // 使用 await 等待异步操作完成,需要将lazyload设置为async的
          const administrationData = await getAdministrationDataSync(
            scenarioId
          );
          console.log("administration Data:", administrationData);

          if (administrationData.length === 0) {
            resolve([]);
          }
          const administration = administrationData.map((administration) => ({
            value: administration.id,
            label: administration.administrationName,
            leaf:true,
          }));
          resolve(administration);
        } catch (error) {
          console.error("Error fetching administration data:", error);
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
    console.log("total", totalScenario);
    const scenarioRes = await onGetScenarioList(
      projectId,
      "",
      "",
      1,
      totalScenario
    );
    console.log("res", scenarioRes);
    return scenarioRes.data.data.data.records;
  } catch (error) {
    console.error("Error fetching scenario data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

const getAdministrationDataSync = async (scenarioId) => {
  try {
    const res = await onGetAdministrationList(scenarioId, "", "", 1, 1);
    const totalAdministration = res.data.data.data.total;
    console.log("total", totalAdministration);
    const administrationRes = await onGetAdministrationList(
      scenarioId,
      "",
      "",
      1,
      totalAdministration
    );
    console.log("res", administrationRes);
    return administrationRes.data.data.data.records;
  } catch (error) {
    console.error("Error fetching administration data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

const finallyChange = (value) => {
  administrationId.value = value[2];
  console.log("最后的选择", administrationId.value);
};

const administrateClick = () => {
  onAdministrate(administrationId.value).then(
    (res) => {
      ElMessageBox.alert(res.data.message, "administrate", {
        confirmButtonText: "OK",
        callback: (action) => {
          ElMessage({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    (err) => {
      console.log(err);
      ElMessageBox.alert("create administration failed", "Title", {
        confirmButtonText: "OK",
        callback: (action) => {
          ElMessage({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    }
  );
};
</script>