import React, { createContext, useContext, useEffect, useState } from 'react'

import * as SecureStorage from '../services/secure-storage'
import { User, UserCredential } from '../interfaces/user'
import AuthService from '../services/auth-service'
import { configDefaultTokenInHeader } from '../services/api'

interface AuthContextData {
  signed: boolean
  user: User | null,
  signIn: (credential: UserCredential) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: any) => {
  const [ user, setUser ] = useState<User | null>(null)

  const signIn = async (credential: UserCredential) => {
    const authService = new AuthService()
    const { token, user } = await authService.login(credential)

    configDefaultTokenInHeader(token)

    setUser(user)

    await SecureStorage.storeItem('beeapp_token', JSON.stringify(token))
    await SecureStorage.storeItem('beeapp_user', JSON.stringify(user))
  }

  const signOut = async () => {
    const authService = new AuthService()
    await authService.logout()

    await SecureStorage.clearItem('beeapp_token')
    await SecureStorage.clearItem('beeapp_user')

    configDefaultTokenInHeader()

    setUser(null)
  }

  useEffect(() => {
    (async () => {
      const storagedToken = await SecureStorage.retrieveItem('beeapp_token')
      const storagedUser = await SecureStorage.retrieveItem('beeapp_user')

      if (storagedUser && storagedToken) {
        configDefaultTokenInHeader(storagedToken)
        setUser(storagedUser)
      }
    })()
  })

  return (
    <AuthContext.Provider value={ { signed: !!user, user, signIn, signOut } }>
      { children }
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { AuthProvider, useAuth }