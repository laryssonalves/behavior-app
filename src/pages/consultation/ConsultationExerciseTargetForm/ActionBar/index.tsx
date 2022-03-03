import React from 'react'
import { View } from 'react-native'

import { Appbar, Colors, Menu } from 'react-native-paper'

import styles from './styles'

type Props = {
  headerState: {
    actionBar: {
      title: string
      subTitle: string
    }
    concluded: boolean
  }
  actions: {
    goBack: () => void
    concludeExercise: () => void
    showResume: () => void
    shuffleTargets: () => void
    unshuffleTargets: () => void
  }
}

const MenuAnchor = ({ openMenu }: any) => <Appbar.Action color={Colors.white} onPress={openMenu} icon="dots-vertical" />

const ConsultationExerciseTargetFormActionBar = ({ headerState, actions }: Props) => {
  const [menuVisible, setMenuVisible] = React.useState(false)

  const openMenu = () => setMenuVisible(true)

  const closeMenu = () => setMenuVisible(false)

  return (
    <Appbar.Header statusBarHeight={0} style={styles.actionBar}>
      <Appbar.BackAction onPress={actions.goBack} />
      <Appbar.Content
        title={headerState.actionBar.title}
        subtitle={headerState.actionBar.subTitle}
        titleStyle={styles.titleStyle}
        subtitleStyle={styles.subTitleStyle}
      />
      {headerState.concluded ? (
        <Appbar.Action icon="lock" />
      ) : (
        <View>
          <Menu statusBarHeight={32} visible={menuVisible} onDismiss={closeMenu} anchor={<MenuAnchor openMenu={openMenu} />}>
            <Menu.Item
              title="Concluir"
              onPress={() => {
                closeMenu()
                actions.concludeExercise()
              }}
            />
            <Menu.Item
              title="Ver resumo"
              onPress={() => {
                closeMenu()
                actions.showResume()
              }}
            />
            <Menu.Item
              title="Randomizar"
              onPress={() => {
                closeMenu()
                actions.shuffleTargets()
              }}
            />
            <Menu.Item
              title="Não randomizar"
              onPress={() => {
                closeMenu()
                actions.unshuffleTargets()
              }}
            />
          </Menu>
        </View>
      )}
    </Appbar.Header>
  )
}

export default ConsultationExerciseTargetFormActionBar
