import React, { createContext, useContext, useState } from 'react'

interface HeaderContextState {
  searchBarVisible: boolean;
  searchBarQuery: string;
  actionBarTitle: string;
  modalVisible: boolean

  page: {
    studentList: {
      studentModalVisible: boolean
    }
  }
}

interface HeaderContextData {
  state: HeaderContextState;
  actions: {
    setSearchBarVisible: (visible: boolean) => void;
    setSearchBarQuery: (query: string) => void;
    setActionBarTitle: (query: string) => void;
    setModalVisible: (visible: boolean) => void;
  };
}

const HeaderContext = createContext<HeaderContextData>({} as HeaderContextData)

const HeaderProvider = ({ children }: any) => {
  const [ state, setState ] = useState<HeaderContextState>({} as HeaderContextState)

  const setSearchBarQuery = (query: string) => { setState({ ...state, searchBarQuery: query }) }

  const setSearchBarVisible = (visible: boolean) => {
    const newState = { ...state, searchBarVisible: visible, searchBarQuery: visible ? state.searchBarQuery : '' }
    setState(newState)
  }

  const setActionBarTitle = (title: string) => {
    const newState = { ...state, actionBarTitle: title }
    setState(newState)
  }

  const setModalVisible = (visible: boolean) => { setState({ ...state, searchBarVisible: visible }) }

  const actions = { setSearchBarVisible, setSearchBarQuery, setActionBarTitle, setModalVisible }

  return (
    <HeaderContext.Provider value={ { state, actions } }>
      { children }
    </HeaderContext.Provider>
  )
}

const useHeaderContext = () => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { HeaderProvider, useHeaderContext }