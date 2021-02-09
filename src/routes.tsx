import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'

import Login from './pages/Login'
import StudentList from './pages/student/StudentList'

import AppHeader from './shared/header'
import _ from 'lodash'

const AppStack = createStackNavigator()

const Routes = () => {
  const [ searchQuery, setSearchQuery ] = useState<string>('')
  const [ query, setQuery ] = useState<string>('')
  const [ modalVisible, setModalVisible ] = useState<boolean>(false)

  const debounceSetSearchQuery = _.debounce(query => setSearchQuery(query), 300)

  const screenOptions = {
    header: (props: StackHeaderProps) => {
      const appHeaderProps = {
        ...props,
        setModalVisible,
        setSearchQuery: debounceSetSearchQuery
      }
      return <AppHeader  { ...appHeaderProps }/>
    }
  }

  useEffect(() => {
    setQuery(searchQuery)
  }, [ searchQuery ])

  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName='Login'
        screenOptions={ screenOptions }>
        <AppStack.Screen name='Login' component={ Login } options={ { headerShown: false } }/>
        <AppStack.Screen name='StudentList'>
          { () => <StudentList searchQuery={ query } modalVisible={ modalVisible }/> }
        </AppStack.Screen>
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

// <AppStack.Screen name='StudentList' component={ StudentList }  />

// <AppStack.Screen name='StudentList'>
//   {() => {
//     console.log(searchQuery)
//     return <StudentList searchQuery={searchQuery} />
//   }}
// </AppStack.Screen>

export default Routes