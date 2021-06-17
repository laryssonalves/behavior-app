import React  from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { AuthProvider } from './contexts/auth.context'

import { setTopLevelNavigator } from './shared/services/navigation-service'

import Routes from './routes'

const MainApp = () => {
  return (
    <NavigationContainer ref={ref => setTopLevelNavigator(ref)}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default MainApp