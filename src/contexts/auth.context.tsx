import React, { createContext, useContext, useEffect, useState } from 'react'

import * as SecureStorage from '../shared/services/secure-storage'
import { configDefaultTokenInHeader } from '../shared/services/api'

import { User, UserCredential } from '../entities/user'
import { login, logout } from '../services/auth-service'
import { getSelectedCompany } from '../services/company-service'

interface AuthContextData {
  signed: boolean
  user: User | null
  signIn: (credential: UserCredential) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)

  const signIn = async (credential: UserCredential) => {
    const { token, user } = await login(credential)

    configDefaultTokenInHeader(token)

    const company = await getSelectedCompany()

    await SecureStorage.storeLogin(token, user, company)

    setUser(user)
  }

  const signOut = async () => {
    try {
      await Promise.all([
        SecureStorage.clearToLogout(),
        logout(),
      ])
    } finally {
      setUser(null)
      configDefaultTokenInHeader()
    }

  }

  useEffect(() => {
    ;(async () => {
      const storagedToken = await SecureStorage.retrieveItem('token')
      const storagedUser = await SecureStorage.retrieveItem('user')

      if (storagedUser && storagedToken) {
        configDefaultTokenInHeader(storagedToken)
        setUser(storagedUser)
      }
    })()
  }, [])

  return <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { AuthProvider, useAuth }
