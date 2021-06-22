import React from 'react'

import ConsultationDetailSearchBar from './SearchBar'
import ConsultationDetailActionBar from './ActionBar'

const ConsultationDetailHeader = (props: any) => {
  const { headerState } = props

  return (
    headerState.searchBar.visible ? 
      <ConsultationDetailSearchBar {...props} /> : <ConsultationDetailActionBar {...props} />
  )
}

export default ConsultationDetailHeader
