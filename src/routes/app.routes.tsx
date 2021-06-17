import React from 'react'

import { View } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'

import StudentList from '../pages/student/StudentList'
import StudentDetail from '../pages/student/StudentDetail'
import GlobalStyle from '../styles/global-style'

const AppStack = createStackNavigator()

const AppRoutes = () => {
  return (
    <View style={GlobalStyle.container}>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="StudentList" component={StudentList} />
        <AppStack.Screen name="StudentDetail" component={StudentDetail} />
      </AppStack.Navigator>
    </View>
  )
}

export default AppRoutes
