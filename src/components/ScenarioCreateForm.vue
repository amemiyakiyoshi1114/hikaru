<template>
  <div>
    <label>choose project : </label>
  <el-select
    v-model="value"
    value-key="id"
    placeholder="Select"
    style="width: 240px"
  >
    <el-option
      v-for="item in projectOptions"
      :key="item.id"
      :label="item.projectName"
      :value="item"
    />
  </el-select>
  <el-button type="primary" @click="onSelect">select</el-button>
  <p>
    selected option's description:
    {{ projectId }}
  </p>
  </div>
  <div>
    <p>fill in scenario detail:</p>
  </div>
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
    <el-form-item label="scenario name" prop="scenarioName">
      <el-input v-model="ruleForm.scenarioName" /><label>{{ ruleForm.scenarioName }}</label>
    </el-form-item>
    <el-form-item label="github repository URL" prop="repository">
      <el-input v-model="ruleForm.repository" />
    </el-form-item>
    <el-form-item label="branch" prop="branch">
      <el-input v-model="ruleForm.branch" />
    </el-form-item>
    <el-form-item label="credentials " prop="credentialsId">
      <el-input v-model="ruleForm.credentialsId" />
    </el-form-item>
    <el-form-item label="test class" prop="testClass">
      <el-input v-model="ruleForm.testClass" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>


<script setup>
import { ref, reactive,onMounted} from 'vue';
import { onGetProjectList,onCreateScenario } from "@/api/axios";
import { ElMessage, ElMessageBox } from "element-plus";

//加载下拉选项
const projectOptions = ref([]);
const value = ref(null);
const projectId = ref(1);
onMounted(async () => {
  onGetProjectList().then(
    res =>{
      const totalProject = res.data.data.data.total;
      onGetProjectList("","",1,totalProject).then(
        res =>{
          projectOptions.value = res.data.data.data.records;
        }
      )
    },
    err => {
      console.log(err);
    }
  )
})
const onSelect = () =>{
  projectId.value = value.value.id;
}
const formSize = ref('default');
const ruleFormRef = ref();
const ruleForm = reactive({
  scenarioName: 'testSeleniumScenario1',
  repository: 'http://xxxxx.git',
  branch: 'main',
  credentialsId: 'token',
  testClass: 'UsingSeleniumTest',
});

const rules = reactive({
  scenarioName: [
    { required: true, message: 'Please input scenario name', trigger: 'blur' },
    { min: 3, max: 255, message: 'Length should be 3 to 255', trigger: 'blur' },
  ],
  repository: [
    {required:true, message: 'please input github repository clone address by http type',trigger:'blur'}
  ],
  branch: [
    {required:true, message: 'please input github repository branch',trigger:'blur'}
  ],
  credentialsId: [
    {required:true, message: 'please input github credential token, remind that token maybe timeout please ensure it is effective',trigger:'blur'}
  ],
  testClass: [
    {required:true, message: 'please input your test java class name',trigger:'blur'}
  ],
});

const scenarioData = ref({
    scenarioName:"testSeleniumScenario1",
    githubRepositoryUrl:"https://github.com/amemiyakiyoshi1114/test001.git",
    branch:"main",
    credentialsId:"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",
    testClass:"UsingSeleniumTest"
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      scenarioData.value.scenarioName = ruleForm.scenarioName;
      scenarioData.value.githubRepositoryUrl = ruleForm.repository;
      scenarioData.value.branch = ruleForm.branch;
      scenarioData.value.credentialsId = ruleForm.credentialsId;
      scenarioData.value.testClass = ruleForm.testClass;

      onCreateScenario(projectId.value,scenarioData.value).then(
        res => {
          ElMessageBox.alert(res.data.message, "Title", {
            confirmButtonText: "OK",
            callback: (action) => {
              ElMessage({
                type: "info",
                message: `action: ${action}`,
              });
            },
          });
        },
        err =>{
          ElMessageBox.alert(err.message, "Title", {
            confirmButtonText: "OK",
            callback: (action) => {
              ElMessage({
                type: "info",
                message: `action: ${action}`,
              });
            },
          });
        }
      )

      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

</script>