<template>
    <div class="container" style="background-image:url(../assets/logo.png)">

  <el-card style="max-width: 1080px;background-image:url(../assets/logo.png)">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="username">
      <el-input v-model="formInline.username" placeholder="username" clearable />
    </el-form-item>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="password">
      <el-input v-model="formInline.password" placeholder="password" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">login</el-button>
    </el-form-item>
  </el-form>
    </el-form>
  
  </el-card>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import {router} from '../router/index'
import {onLoginSubmit} from '../api/axios'
const formInline = reactive({
  username: '',
  password: ''
})

const onSubmit = () => {
  onLoginSubmit(formInline.username,formInline.password)
  .then(res =>{
    console.log(res.data.data.id)
    sessionStorage.setItem('loginUser', res.data);
    console.log('ssession')
    console.log(sessionStorage)
    router.push('/hikaru')
  },err =>{
    console.log(err)
  })
}

</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.container{
  display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 80vh; /* 设置宽度 */
    height: 100vh; /* 设置父容器高度 */
}
</style>