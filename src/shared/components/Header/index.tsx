import React from 'react'

import SearchBar from './SearchBar'
import ActionBar from './ActionBar'
import { useHeaderContext } from '../../contexts/header.context'

const AppHeader = (props: any) => {
  const { state } = useHeaderContext()
  return state.searchBarVisible ? <SearchBar /> : <ActionBar {...props} />
}

export default AppHeader
