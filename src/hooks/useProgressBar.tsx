import React, { useState } from 'react'

import { ProgressBar } from 'react-native-paper'
import { PRIMARY_COLOR } from '../colors'
import GlobalStyle from '../styles/global-style'

const useProgressBar = () => {
  const [visible, setVisible] = useState(false)

  const showProgress = () => setVisible(true)
  const hideProgress = () => setVisible(false)

  const ProgressIndicator = () => 
      <ProgressBar style={GlobalStyle.progressBar} visible={visible} color={PRIMARY_COLOR} indeterminate />

  return { ProgressIndicator, showProgress, hideProgress }
}

export default useProgressBar
