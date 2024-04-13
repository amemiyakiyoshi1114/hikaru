import axios from 'axios';
axios.defaults.withCredentials = true;

export const onLoginSubmit = (username, password) => {
  return axios({
    url: 'http://localhost:8089/userInfo/login',
    method: 'post',
    params: {
      username: username,
      password: password
    }
  })
}

export const onGetProjectList = (keyword, orderBy, pageNum, pageSize) => {
  return axios({
    url: 'http://localhost:8089/project/list',
    method: 'get',
    params: {
      keyword: keyword,
      orderBy: orderBy,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export const onCreateProject = (data) => {
  return axios({
    url: 'http://localhost:8089/project/create',
    method: 'post',
    data: data
  })
}

export const onGetScenarioList = (projectId, keyword, orderBy, pageNum, pageSize) => {
  return axios({
    url: 'http://localhost:8089/scenario/list',
    method: 'get',
    params: {
      projectId: projectId,
      keyword: keyword,
      orderBy: orderBy,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export const onCreateScenario = (projectId, data) => {
  return axios({
    url: 'http://localhost:8089/scenario/create',
    method: 'post',
    params: {
      projectId: projectId,
    },
    data: data
  })
}

export const onGetAdministrationList = (scenarioId, keyword, orderBy, pageNum, pageSize) => {
  return axios({
    url: 'http://localhost:8089/administration/list',
    method: 'get',
    params: {
      scenarioId: scenarioId,
      keyword: keyword,
      orderBy: orderBy,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export const onCreateAdministration = (scenarioId, data) => {
  return axios({
    url: 'http://localhost:8089/administration/create',
    method: 'post',
    params: {
      scenarioId: scenarioId,
    },
    data: data
  })
}

export const onAdministrate = (administrationId) => {
  return axios({
    url: 'http://localhost:8089/administration/administrate',
    method: 'post',
    params: {
      administrationId: administrationId,
    }
  })
}

export const onGetReportList = (administrationId, keyword, orderBy, pageNum, pageSize) => {
  return axios({
    url: 'http://localhost:8089/report/list',
    method: 'get',
    params: {
      administrationId: administrationId,
      keyword: keyword,
      orderBy: orderBy,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export const onGetReportDetail = (reportName,administrationId) => {
  return axios({
    url: 'http://localhost:8089/report/detail',
    method: 'get',
    params: {
      reportName: reportName,
      administrationId: administrationId,
    }
  })
}