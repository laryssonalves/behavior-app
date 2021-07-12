import React from 'react'

import StudentListSearchBar from './SearchBar'
import StudentListActionBar from './ActionBar'

const StudentListHeader = (props: any) => {
  const { headerState } = props

  return (
    headerState.searchBar.visible ? 
      <StudentListSearchBar {...props} /> : <StudentListActionBar {...props} />
  )
}

export default StudentListHeader
