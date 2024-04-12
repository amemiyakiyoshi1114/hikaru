<template>
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
    <el-form-item label="project name" prop="name">
      <el-input v-model="ruleForm.name" />
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
  
  <script setup>
import { ref, reactive } from "vue";
import { onCreateProject } from "@/api/axios";
import { ElMessage, ElMessageBox } from "element-plus";
//import type { Action } from "element-plus";

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  name: "yourProject",
});

const rules = reactive({
  name: [
    { required: true, message: "Please input project name", trigger: "blur" },
    {
      min: 3,
      max: 255,
      message: "Length should not be shorter than 3 chars",
      trigger: "blur",
    },
  ],
});

const projectData = ref({
  projectName: "maria",
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      projectData.value.projectName = ruleForm.name;
      onCreateProject(projectData.value).then(
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
          ElMessageBox.alert("create project failed", "Title", {
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
  