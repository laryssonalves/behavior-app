import { StyleSheet } from 'react-native'

import { SECONDARY_COLOR } from '../../../../../colors'
import GlobalStyle from '../../../../../styles/global-style'

const styles = StyleSheet.create({
  actionBar: {
    height: 60,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleStyle: {
    ...GlobalStyle.textMedium,
    color: 'white',
  },
})

export default styles
