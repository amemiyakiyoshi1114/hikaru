<template>
    <el-cascader
    :props="props"
    @change="finallyChange"
  />
  <el-button type="primary" @click="onSelect">select</el-button>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="administration name" prop="name">
      <el-input v-model="ruleForm.name" />
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import {
  onGetProjectList,
  onGetScenarioList,
  onCreateAdministration
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

//form
const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  name: "yourAdministration",
});

const rules = reactive({
  name: [
    { required: true, message: "Please input administration name", trigger: "blur" },
    {
      min: 3,
      max: 255,
      message: "Length should not be shorter than 3 chars",
      trigger: "blur",
    },
  ],
});

const administrationData = ref({
  administrationName: "maria",
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      administrationData.value.administrationName = ruleForm.name;
      onCreateAdministration(scenarioId.value,administrationData.value).then(
        (res) => {
          console.log(res);
          ElMessageBox.alert(res.data.message, "Title", {
            // if you want to disable its autofocus
            // autofocus: false,
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
            // if you want to disable its autofocus
            // autofocus: false,
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
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

</script>
