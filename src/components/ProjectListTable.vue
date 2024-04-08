<template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router'; 
  const route = useRoute(); // 使用 useRoute 函数来获取 route 对象
  console.log( route.query);
  const tableData = ref([
    {
      date: '2016-05-03',
      name: route.query.name,
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ])
  </script>