import React, { useEffect, useState } from 'react'

import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'

import StudentList from '../pages/student/StudentList'
import AppHeader from '../shared/header'
import _ from 'lodash'

const AppStack = createStackNavigator()

const AppRoutes = () => {
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
    <AppStack.Navigator screenOptions={ screenOptions }>
      <AppStack.Screen name='StudentList'>
        { () => <StudentList searchQuery={ query } modalVisible={ modalVisible }/> }
      </AppStack.Screen>

    </AppStack.Navigator>
  )
}

export default AppRoutes