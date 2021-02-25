import React, { createContext, useContext, useEffect, useState } from 'react'

import * as SecureStorage from '../shared/services/secure-storage'
import { configDefaultTokenInHeader } from '../shared/services/api'

import { User, UserCredential } from '../interfaces/user'
import AuthService from '../services/auth-service'
import CompanyService from '../services/company-service'

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
    const authService = AuthService.getInstance()
    const companyService = CompanyService.getInstance()

    const { token, user } = await authService.login(credential)

    configDefaultTokenInHeader(token)

    const company = await companyService.getSelectedCompany()

    await SecureStorage.storeItem('token', JSON.stringify(token))
    await SecureStorage.storeItem('user', JSON.stringify(user))
    await SecureStorage.storeItem('company', JSON.stringify(company))

    setUser(user)
  }

  const signOut = async () => {
    const authService = AuthService.getInstance()

    await authService.logout()

    await SecureStorage.clearItem('token')
    await SecureStorage.clearItem('user')
    await SecureStorage.clearItem('company')

    configDefaultTokenInHeader()

    setUser(null)
  }

  useEffect(() => {
    (async () => {
      const storagedToken = await SecureStorage.retrieveItem('token')
      const storagedUser = await SecureStorage.retrieveItem('user')

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