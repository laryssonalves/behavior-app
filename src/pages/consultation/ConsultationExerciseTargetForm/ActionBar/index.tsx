import React from 'react'

import { Appbar } from 'react-native-paper'

import styles from './styles'

const ConsultationExerciseTargetFormActionBar = (props: any) => {
  const {headerState, actions} = props

  return (
    <Appbar.Header statusBarHeight={0} style={styles.actionBar}>
      <Appbar.BackAction onPress={actions.goBack} />
      <Appbar.Content
        title={headerState.actionBar.title}
        subtitle={headerState.actionBar.subTitle}
        titleStyle={styles.titleStyle}
        subtitleStyle={styles.subTitleStyle}/>
    </Appbar.Header>
  )
}

export default ConsultationExerciseTargetFormActionBar
