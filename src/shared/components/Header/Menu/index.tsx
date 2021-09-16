import React from 'react'

import { Appbar } from 'react-native-paper'

const MenuStudentList = ({ onSearchPress, onLogoutPress }: any) => (
  <>
    <Appbar.Action icon="magnify" color="white" onPress={onSearchPress} />
    <Appbar.Action icon="logout-variant" color="white" onPress={onLogoutPress} />
  </>
)

const MenuStudentDetail = ({ onAddPress }: any) => (
  <>
    <Appbar.Action icon="plus-circle" color="white" onPress={onAddPress} />
  </>
)

export { MenuStudentList, MenuStudentDetail }
