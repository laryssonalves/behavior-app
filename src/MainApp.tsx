import React  from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { AuthProvider } from './contexts/auth.context'

import Routes from './routes'

const MainApp = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default MainApp