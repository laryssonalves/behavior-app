import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.18.206:8000/',
});

api.interceptors.request.use(axiosRequestConfig => {
  const backSlashUrl = axiosRequestConfig.url?.endsWith('/')

  axiosRequestConfig.url = backSlashUrl ? axiosRequestConfig.url : `${axiosRequestConfig.url}/`

  return axiosRequestConfig
})

const configDefaultTokenInHeader = (token?: string) => {
  api.defaults.headers.Authorization = token ? `Token ${ token }` : ''
}

export {api, configDefaultTokenInHeader}
