import React from 'react'

import { View } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'

import StudentList from '../pages/student/StudentList'
import StudentDetail from '../pages/student/StudentDetail'
import GlobalStyle from '../styles/global-style'
import ConsultationDetail from '../pages/consultation/ConsultationDetail'
import ConsultationExerciseTargetForm from '../pages/consultation/ConsultationExerciseTargetForm'
import ConsultationResume from '../pages/consultation/ConsultationResume'

const AppStack = createStackNavigator()

const AppRoutes = () => {
  return (
    <View style={GlobalStyle.container}>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="StudentList" component={StudentList} />
        <AppStack.Screen name="StudentDetail" component={StudentDetail} />
        <AppStack.Screen name="ConsultationDetail" component={ConsultationDetail} />
        <AppStack.Screen name="ConsultationResume" component={ConsultationResume} />
        <AppStack.Screen name="ConsultationExerciseTargetForm" component={ConsultationExerciseTargetForm} />
      </AppStack.Navigator>
    </View>
  )
}

export default AppRoutes
