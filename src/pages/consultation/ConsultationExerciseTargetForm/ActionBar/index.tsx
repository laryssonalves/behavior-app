import React from 'react'

import { Appbar, Button, Colors, Menu } from 'react-native-paper'

import styles from './styles'

const ConsultationExerciseTargetFormActionBar = (props: any) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  
  const {headerState, actions} = props

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const MenuAnchor = <Appbar.Action color={Colors.white} onPress={openMenu} icon="dots-vertical"/>

  return (
    <Appbar.Header statusBarHeight={0} style={styles.actionBar}>
      <Appbar.BackAction onPress={actions.goBack} />
      <Appbar.Content
        title={headerState.actionBar.title}
        subtitle={headerState.actionBar.subTitle}
        titleStyle={styles.titleStyle}
        subtitleStyle={styles.subTitleStyle}/>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={MenuAnchor}>
          <Menu.Item 
            title="Concluir" 
            onPress={() => {
              closeMenu()
              actions.finishApplication()
            }} />
          <Menu.Item 
            title="Ver resumo" 
            onPress={() => {
              closeMenu()
              actions.showResume()
            }} />
        </Menu>
    </Appbar.Header>
  )
}

export default ConsultationExerciseTargetFormActionBar
