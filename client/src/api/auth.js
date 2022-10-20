import axios from 'axios'
axios.defaults.withCredentials = true


//const url = 'http://localhost:4000';
const url = 'https://healthy-dent-back-end.fly.dev';



export async function onRegistration(registrationData) {
  return await axios.post(
    `${url}/register`,
    registrationData
  )
}

export async function onLogin(loginData) {
  return await axios.post(`${url}/login`, loginData)
}

export async function onLogout() {
  return await axios.get(`${url}/logout`)
}

export async function getProfessional(){
  return await axios.get(`${url}/search`)
}

export async function registerProfessional(registerData){
  return await axios.post(`${url}/register/professional`, registerData)
}

export async function createTurn(turnData){
  return await axios.post(`${url}/turn`, turnData)
}


