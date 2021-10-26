import React, { useCallback, useEffect, useRef } from 'react'

import { BackHandler } from 'react-native'

import _ from 'lodash'

import { Searchbar } from 'react-native-paper'

import { useHeaderContext } from '../../../contexts/header.context'

import styles from './styles'
import { useState } from 'react'

const SearchBar = () => {
  const { state, actions } = useHeaderContext()

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
      autoFocus={state.searchBarVisible}
      // onChangeText={ text => setQuery(text) }
      onChangeText={onSearchChange}
      value={query}
    />
  )
}

export default SearchBar
