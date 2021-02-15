import { StyleSheet } from 'react-native'

import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR } from '../../../../colors'

import GlobalStyle from '../../../../global-style'

const styles = StyleSheet.create({
    actionBar: {
      height: 60,
      backgroundColor: SECONDARY_COLOR,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    titleStyle: {
      ...GlobalStyle.textMedium,
      color: 'white'
    }
})

export default styles