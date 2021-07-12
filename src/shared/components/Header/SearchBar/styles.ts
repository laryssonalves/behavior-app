import { StyleSheet } from 'react-native'

import { SECONDARY_COLOR } from '../../../../colors'

import GlobalStyle from '../../../../styles/global-style'

const styles = StyleSheet.create({
    searchBar: {
      height: 60,
      backgroundColor: SECONDARY_COLOR,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    inputStyle: {
      ...GlobalStyle.textMedium,
      color: 'white'
    }
})

export default styles