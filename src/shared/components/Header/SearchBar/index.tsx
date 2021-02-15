import React, { useEffect, useState } from 'react'

import { Searchbar } from 'react-native-paper'

import { useHeaderContext } from '../../../contexts/header.context'

import styles from './styles'
import { BackHandler } from 'react-native'

const SearchBar = () => {
  const { state, actions } = useHeaderContext()

  const backAction = () => {
    actions.setSearchBarVisible(false)
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Searchbar
      style={ styles.searchBar }
      inputStyle={ styles.inputStyle }
      icon={ 'arrow-left' }
      iconColor={ 'white' }
      onIconPress={ () => { actions.setSearchBarVisible(false) } }
      selectionColor={ 'white' }
      placeholderTextColor={ 'white' }
      placeholder="Pesquisar estudante..."
      autoFocus={ state.searchBarVisible }
      onChangeText={ actions.setSearchBarQuery }
      value={ state.searchBarQuery }
    />
  )
}

export default SearchBar