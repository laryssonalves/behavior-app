import React  from 'react'

import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'

import StudentList from '../pages/student/StudentList'
import AppHeader from '../shared/components/Header'
import { HeaderProvider } from '../shared/contexts/header.context'

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
      </AppStack.Navigator>
    </HeaderProvider>
  )
}

export default AppRoutes