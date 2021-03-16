import React from 'react'

import { useRoute } from '@react-navigation/native'

import { Appbar } from 'react-native-paper'

import { useAuth } from '../../../../contexts/auth.context'
import { useHeaderContext } from '../../../contexts/header.context'

import { MenuStudentDetail, MenuStudentList } from '../Menu'

import styles from './styles'

const ActionBar = ({ navigation, previous }: any) => {
  const route = useRoute()

  const { signOut } = useAuth()

  const { state, actions } = useHeaderContext()

  const headerScreenMap = [
    {
      screenName: 'StudentList',
      menu: (
        <MenuStudentList
          onSearchPress={() => actions.setSearchBarVisible(true)}
          onLogoutPress={async () => await signOut()}
        />
      )
    },
    {
      screenName: 'StudentDetail',
      menu: <MenuStudentDetail onAddPress={() => console.log('add')} />
    }
  ]

  const getHeaderScreen = () => {
    return headerScreenMap.find(
      headerScreen => headerScreen.screenName === route.name
    )?.menu
  }

  return (
    <Appbar.Header statusBarHeight={0} style={styles.actionBar}>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={state.actionBarTitle}
        titleStyle={styles.titleStyle}
      />
      {getHeaderScreen()}
    </Appbar.Header>
  )
}

export default ActionBar
