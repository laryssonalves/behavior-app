import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { Appbar } from 'react-native-paper'

import { MenuStudentDetail } from '../Menu'

import styles from './styles'

const StudentDetailActionBar = ({title}: any) => {
  const navigation = useNavigation()

  return (
    <Appbar.Header statusBarHeight={0} style={styles.actionBar}>
      <Appbar.BackAction onPress={navigation.goBack} />
      <Appbar.Content
        title={title}
        titleStyle={styles.titleStyle}
      />
      <MenuStudentDetail onAddPress={() => console.log('add')} />
    </Appbar.Header>
  )
}

export default StudentDetailActionBar
