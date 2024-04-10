import axios from 'axios'


const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

api.interceptors.request.use(axiosRequestConfig => {
  console.log({ axiosRequestConfig })
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
