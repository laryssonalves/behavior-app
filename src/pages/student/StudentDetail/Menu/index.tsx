import React from 'react'

import { Appbar } from 'react-native-paper'

const MenuStudentDetail = ({ onAddPress }: any) => (
  <>
    <Appbar.Action icon="plus-circle" color="white" onPress={onAddPress} />
  </>
)

export { MenuStudentDetail }
