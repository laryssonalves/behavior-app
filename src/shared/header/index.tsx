import React, { useEffect, useState } from 'react'

import { View } from 'react-native'

import { useRoute } from '@react-navigation/native'

import { Appbar, Searchbar } from 'react-native-paper'

import * as SecureStorage from '../../services/secure-storage'

import { useAuth } from '../../contexts/auth.context'

import styles from './styles'

const AppHeader = ({ navigation, previous, setSearchQuery, setModalVisible }: any) => {
  const [ title, setTitle ] = useState<string>('')
  const [ searchBarVisible, setSearchBarVisible ] = useState<boolean>(false)
  const [ searchBarQuery, setSearchBarQuery ] = useState<string>('')

  const { signOut } = useAuth()

  const route = useRoute()

  const noBackButton = [ 'Login' ]

  useEffect(() => {
    getHeaderTitle().then(obj => {
      setTitle(obj.title)
    })
  }, [ route.name ])

  const getHeaderTitle = async () => {
    switch (route.name) {
      case 'StudentList':
        const user = await SecureStorage.retrieveItem('user_details')
        return { title: 'Estudantes', subTitle: `Usuário: ${ user.name }` }
      default:
        return { title: '', subTitle: '' }
    }
  }

  useEffect(() => {
    const query = searchBarVisible ? searchBarQuery : ''
    setSearchQuery(query)
  }, [ searchBarQuery, searchBarVisible ])

  return (
    <View>
      { searchBarVisible ?
        <Searchbar
          style={ styles.appBarHeader }
          inputStyle={ styles.appBarContentTitle }
          icon={ 'arrow-left' }
          iconColor={ 'white' }
          onIconPress={ () => { setSearchBarVisible(false) } }
          selectionColor={ 'white' }
          placeholderTextColor={ 'white' }
          placeholder="Pesquisar"
          autoFocus={ searchBarVisible }
          onChangeText={ (query: string) => setSearchBarQuery(query) }
          value={ searchBarQuery }
        />

        :

        <Appbar.Header
          statusBarHeight={ 0 }
          style={ styles.appBarHeader }>
          {
            previous && !noBackButton.includes(previous.route.name) ?
              <Appbar.BackAction onPress={ navigation.goBack }/> : null
          }
          <Appbar.Content
            title={ title }
            titleStyle={ styles.appBarContentTitle }/>
          <Appbar.Action
            icon='magnify'
            onPress={ () => { setSearchBarVisible(true) } }/>
          <Appbar.Action icon='plus' onPress={ () => { setModalVisible(true) } }/>
          <Appbar.Action icon='logout-variant' onPress={ async () => await signOut() }/>
        </Appbar.Header>
      }
    </View>
  )
}

// <Menu
//   visible={ appHeaderState.menuVisible }
//   onDismiss={ () => { setAppHeaderState({ ...appHeaderState, menuVisible: false }) } }
//   anchor={
//     <Appbar.Action
//       icon={ Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical' }
//       color='white'
//       onPress={ () => { setAppHeaderState({ ...appHeaderState, menuVisible: true }) } }/>
//   }>
//   <Menu.Item title='Filtrar estudante' icon='magnify' />
// </Menu>

export default AppHeader

