import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { AuthProvider } from './contexts/auth.context'

import { setTopLevelNavigator } from './shared/services/navigation-service'

import Routes from './routes'

const MainApp = ({ onReady }: { onReady: () => void }) => {
  return (
    <NavigationContainer onReady={onReady} ref={ref => setTopLevelNavigator(ref)}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default MainApp
