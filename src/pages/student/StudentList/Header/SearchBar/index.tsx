import React, { useCallback, useEffect, useState } from 'react'

import { BackHandler } from 'react-native'

import { Searchbar } from 'react-native-paper'

import _ from 'lodash'

import styles from './styles'

const StudentListSearchBar = ({ headerState, actions }: any) => {
  const [query, setQuery] = useState<string>('')

  const delayedSetSearchBarQuery = useCallback(
    _.debounce(search => {
      actions.setSearchBarQuery(search)
    }, 300),
    []
  )

  const onSearchChange = (search: string) => {
    setQuery(search)
    delayedSetSearchBarQuery(search)
  }

  const backAction = () => {
    actions.setSearchBarVisible(false)
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove()
  }, [])

  return (
    <Searchbar
      style={styles.searchBar}
      inputStyle={styles.inputStyle}
      icon={'arrow-left'}
      iconColor={'white'}
      onIconPress={() => {
        actions.setSearchBarVisible(false)
      }}
      selectionColor={'white'}
      placeholderTextColor={'white'}
      placeholder="Pesquisar aprendente..."
      autoFocus={headerState.searchBar.visible}
      onChangeText={onSearchChange}
      value={query}
    />
  )
}

export default StudentListSearchBar
