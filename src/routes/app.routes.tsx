import React from 'react'

import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'

import { HeaderProvider } from '../shared/contexts/header.context'

import AppHeader from '../shared/components/Header'

import StudentList from '../pages/student/StudentList'
import StudentDetails from '../pages/student/StudentDetails'

const AppStack = createStackNavigator()

const AppRoutes = () => {
  const screenOptions = {
    header: (props: StackHeaderProps) => {
      return <AppHeader  { ...props }/>
    }
  }

  return (
    <HeaderProvider>
      <AppStack.Navigator screenOptions={ screenOptions }>
        <AppStack.Screen name='StudentList' component={ StudentList }/>
        <AppStack.Screen name='StudentDetails' component={ StudentDetails }/>
      </AppStack.Navigator>
    </HeaderProvider>
  )
}

export default AppRoutes