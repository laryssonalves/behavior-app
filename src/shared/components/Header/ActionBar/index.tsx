import React, { useEffect, useState } from 'react'

import { useRoute } from '@react-navigation/native'

import { Appbar } from 'react-native-paper'

import { useAuth } from '../../../../contexts/auth.context'
import { useHeaderContext } from '../../../contexts/header.context'

import styles from './styles'

const getHeaderTitle = (name: string): string => {
  switch (name) {
    case 'StudentList':
      return 'Estudantes'
    default:
      return ''
  }
}

const ActionBar = ({ navigation, previous }: any) => {
  const [ title, setTitle ] = useState<string>('')

  const { signOut } = useAuth()

  const { actions } = useHeaderContext()

  const route = useRoute()

  useEffect(() => {
    setTitle(getHeaderTitle(route.name))
  }, [ route.name ])

  return (
    <Appbar.Header
      statusBarHeight={ 0 }
      style={ styles.actionBar }>
      {
        previous ?
          <Appbar.BackAction onPress={ navigation.goBack }/> : null
      }
      <Appbar.Content
        title={ title }
        titleStyle={ styles.titleStyle }/>
      <Appbar.Action
        icon='magnify'
        onPress={ () => { actions.setSearchBarVisible(true) } }/>
      {/* <Appbar.Action icon='plus' onPress={ () => { actions.setModalVisible(true) } }/> */ }
      <Appbar.Action icon='logout-variant' onPress={ async () => await signOut() }/>
      {/*<Appbar.Action icon='refresh' onPress={ () => setLoading(!loading) }/>*/}
    </Appbar.Header>
  )
}

export default ActionBar