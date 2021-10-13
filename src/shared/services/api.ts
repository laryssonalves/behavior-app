import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(axiosRequestConfig => {
  const backSlashUrl = axiosRequestConfig.url?.endsWith('/')

  axiosRequestConfig.url = backSlashUrl ? axiosRequestConfig.url : `${axiosRequestConfig.url}/`
  return axiosRequestConfig
})

api.interceptors.response.use(undefined, async error => {
  return Promise.reject(error)
})

const configDefaultTokenInHeader = (token?: string) => {
  api.defaults.headers.Authorization = token ? `Token ${token}` : ''
}

export { api, configDefaultTokenInHeader }
