import { api } from '../shared/services/api'

import { User, UserCredential } from '../entities/user'
import { TokenResponse } from '../entities/token-response'

const loginUrl = 'auth/login/'
const logoutUrl = 'auth/logout/'
const userDetailsUrl = 'users/details/'

const login = async (credential: UserCredential): Promise<any> => {
  const tokenResponse = await api.post(loginUrl, credential)
  const { token } = tokenResponse.data as TokenResponse

  const headers = { Authorization: `Token ${ token }` }
  const userResponse = await api.get(userDetailsUrl, { headers })
  const user = userResponse.data as User
  
  return { token, user }
}

const logout = async (): Promise<void> => {
  await api.delete(logoutUrl)
}

export { login, logout }