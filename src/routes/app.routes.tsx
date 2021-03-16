import React from 'react'

import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'

import { HeaderProvider } from '../shared/contexts/header.context'

import AppHeader from '../shared/components/Header'

import StudentList from '../pages/student/StudentList'
import StudentDetail from '../pages/student/StudentDetail'

const AppStack = createStackNavigator()

const AppRoutes = () => {
  const screenOptions = {
    header: (props: StackHeaderProps) => {
      return <AppHeader {...props} />
    },
  }

  return (
    <HeaderProvider>
      <AppStack.Navigator screenOptions={screenOptions}>
        <AppStack.Screen name="StudentList" component={StudentList} />
        <AppStack.Screen name="StudentDetail" component={StudentDetail} />
      </AppStack.Navigator>
    </HeaderProvider>
  )
}

export default AppRoutes
