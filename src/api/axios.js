import axios from 'axios';
axios.defaults.withCredentials=true;

export const onLoginSubmit = (username,password) =>{
  return axios({
    url:'http://localhost:8089/userInfo/login',
    method:'post',
    params:{
      username:username,
      password:password
    }
   })
}

export const onGetProjectList = (keyword,orderBy,pageNum,pageSize) => {
  return axios({
    url:'http://localhost:8089/project/list',
    method:'get',
    params:{
      keyword:keyword,
      orderBy:orderBy,
      pageNum:pageNum,
      pageSize:pageSize
    }
  })
}

export const onCreateProject = (data) => {
  return axios({
    url:'http://localhost:8089/project/create',
    method:'post',
    data:data
  })
}

export const onGetScenarioList = (projectId,keyword,orderBy,pageNum,pageSize) => {
  return axios({
    url:'http://localhost:8089/scenario/list',
    method:'get',
    params:{
      projectId:projectId,
      keyword:keyword,
      orderBy:orderBy,
      pageNum:pageNum,
      pageSize:pageSize
    }
  })
}

export const onCreateScenario = (projectId,data) => {
  return axios({
    url:'http://localhost:8089/scenario/create',
    method:'post',
    params:{
      projectId:projectId,
    },
    data:data
  })
}


