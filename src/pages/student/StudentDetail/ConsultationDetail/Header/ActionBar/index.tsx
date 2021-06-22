import React from 'react'

import { Appbar } from 'react-native-paper'

import styles from './styles'

const StudentListActionBar = (props: any) => {
  const {headerState, actions} = props

  return (
    <Appbar.Header statusBarHeight={0} style={styles.actionBar}>
      <Appbar.Content
        title={headerState.actionBar.title}
        titleStyle={styles.titleStyle}/>
      {/* <MenuStudentList
        onSearchPress={() => actions.setSearchBarVisible(true)}
        onLogoutPress={async () => await signOut()}/> */}
    </Appbar.Header>
  )
}

export default StudentListActionBar
