import { api } from './api'
import { User, UserCredential } from '../interfaces/user'

export default class AuthService {
  private loginUrl = 'auth/login/'
  private logoutUrl = 'auth/logout/'
  private userDetailsUrl = 'users/details/'

  constructor() {}

  async login(credential: UserCredential) {
    const tokenResponse = await api.post(this.loginUrl, credential)
    const { token } = tokenResponse.data as TokenResponse

    const headers = { Authorization: `Token ${ token }` }
    const userResponse = await api.get(this.userDetailsUrl, { headers })
    const user = userResponse.data as User

    return { token, user }
  }

  async logout(): Promise<void> {
    await api.delete(this.logoutUrl)
  }
}

