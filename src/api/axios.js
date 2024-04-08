import axios from 'axios';

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

