import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Login from '../pages/Login'

const AppStack = createStackNavigator()

const AuthRoutes = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name='Login' component={ Login } options={ { headerShown: false } }/>
    </AppStack.Navigator>
  )
}

export default AuthRoutes