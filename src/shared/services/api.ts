import axios from 'axios'
import * as SecureStorage from './secure-storage'
import { logoutUrl } from '../../services/auth-service'


const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

api.interceptors.request.use(axiosRequestConfig => {
  const backSlashUrl = axiosRequestConfig.url?.endsWith('/')

  axiosRequestConfig.url = backSlashUrl ? axiosRequestConfig.url : `${axiosRequestConfig.url}/`
  return axiosRequestConfig
})

api.interceptors.response.use(undefined, async error => {
  if (error.response.status === 401 || error.response.status === 403) {
    try {
      await SecureStorage.clearToLogout()
      await api.delete(logoutUrl)
    } finally {
      configDefaultTokenInHeader()
    }
  }
  return Promise.reject(error)
})

const configDefaultTokenInHeader = (token?: string) => {
  api.defaults.headers.Authorization = token ? `Token ${token}` : ''
}

export { api, configDefaultTokenInHeader }
