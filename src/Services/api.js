import axios from "axios"
axios.defaults.baseURL="http://3.129.218.77:3001/api/"




export const login=(email,password)=>{
    return axios.post("auth/login",{email,password})
}

export const register=(name,email,password,phone)=>{
    return axios.post("/auth/register",{name,email,password,phone})
}

export const verify=(otp)=>{
    let usertoken=localStorage.getItem("token")
    return axios.post("/user/verify",{otp},{
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      })
}

export const getdevice=()=>{
    let usertoken=localStorage.getItem("token")
    return axios.get("/user/getdevices",{
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      })
}


export const renamedevice=(name,device_id,type)=>{
    let usertoken=localStorage.getItem("token")
    return axios.post("/user/renamedevice",{name,device_id,type},{
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      })
    
}

export const getunassigned=()=>{
    let usertoken=localStorage.getItem("token")
    return axios.get("/user/getunassigned",{
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      })
    
}

export const addFarm=(name,size,sensors,outputs)=>{
  let usertoken=localStorage.getItem("token")
  return axios.post("/user/addfarm",{name,size,sensors,outputs},{
      headers: {
        authorization: `Bearer ${usertoken}`,
      },
    })
  
}

export const getFarms=()=>{
  let usertoken=localStorage.getItem("token")
  return axios.get("/user/getfarms",{
      headers: {
        authorization: `Bearer ${usertoken}`,
      },
    })
  
}


export const getSensors=(current_farm)=>{
  let usertoken=localStorage.getItem("token")
  return axios.get("/user/getsensors/"+current_farm,{
      headers: {
        authorization: `Bearer ${usertoken}`,
      },
    })
}

export const getSensorData=(farm,sensor)=>{
  let usertoken=localStorage.getItem("token")
  return axios.get(`/user/getgraph/${farm}/${sensor}`,{
      headers: {
        authorization: `Bearer ${usertoken}`,
      },
    })
}