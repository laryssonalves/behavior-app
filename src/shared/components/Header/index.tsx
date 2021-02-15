import React from 'react'

import SearchBar from './SearchBar'
import ActionBar from './ActionBar'
import { useHeaderContext } from '../../contexts/header.context'

const AppHeader = ({ navigation, previous }: any) => {
  const { state: { searchBarVisible } } = useHeaderContext()
  return searchBarVisible ? <SearchBar  /> : <ActionBar { ...{ navigation, previous } } />
}

export default AppHeader

