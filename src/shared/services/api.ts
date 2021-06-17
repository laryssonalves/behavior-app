import axios from 'axios';

import { navigate } from './navigation-service'

import * as SecureStorage from '../../shared/services/secure-storage'

const api = axios.create({
  baseURL: 'http://192.168.18.206:8000/',
  // baseURL: 'https://bhavior-api.herokuapp.com/'
});

api.interceptors.request.use(
  axiosRequestConfig => {
    const backSlashUrl = axiosRequestConfig.url?.endsWith('/')
  
    axiosRequestConfig.url = backSlashUrl ? axiosRequestConfig.url : `${axiosRequestConfig.url}/`

    return axiosRequestConfig
  }
)

api.interceptors.response.use(
  undefined, 
  async error => {
    // if (error.response.status === 403) {
    //   await SecureStorage.clearToLogout()
    //   navigate('Login')
    // }
    return Promise.reject(error)
  }
)

const configDefaultTokenInHeader = (token?: string) => {
  api.defaults.headers.Authorization = token ? `Token ${ token }` : ''
}

export {api, configDefaultTokenInHeader}
