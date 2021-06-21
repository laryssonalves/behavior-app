import React from 'react'

import { View } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'

import StudentList from '../pages/student/StudentList'
import StudentDetail from '../pages/student/StudentDetail'
import GlobalStyle from '../styles/global-style'
import ConsultationDetail from '../pages/student/StudentDetail/ConsultationDetail'

const AppStack = createStackNavigator()

const AppRoutes = () => {
  return (
    <View style={GlobalStyle.container}>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="StudentList" component={StudentList} />
        <AppStack.Screen name="StudentDetail" component={StudentDetail} />
        <AppStack.Screen name="ConsultationDetail" component={ConsultationDetail} />
      </AppStack.Navigator>
    </View>
  )
}

export default AppRoutes
