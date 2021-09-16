import { api } from '../shared/services/api'

import { User, UserCredential } from '../entities/user'
import { TokenResponse } from '../entities/token-response'

const loginUrl = 'auth/login/'
const logoutUrl = 'auth/logout/'
const userDetailsUrl = 'users/details/'

const login = async (credential: UserCredential): Promise<any> => {
  const loginHeaders = { Authorization: null }
  const tokenResponse = await api.post(loginUrl, credential, { headers: loginHeaders })

  const { token } = tokenResponse.data as TokenResponse

  const userHeaders = { Authorization: `Token ${token}` }
  const userResponse = await api.get(userDetailsUrl, { headers: userHeaders })

  const user = userResponse.data as User

  return { token, user }
}

const logout = async (): Promise<void> => {
  await api.delete(logoutUrl)
}

export { login, logout }
