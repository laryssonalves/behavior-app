import { StyleSheet } from 'react-native'

import { SECONDARY_COLOR } from '../../../../colors'
import GlobalStyle from '../../../../styles/global-style'

const styles = StyleSheet.create({
  actionBar: {
    height: 60,
    backgroundColor: SECONDARY_COLOR,
  },

  titleStyle: {
    ...GlobalStyle.textMedium,
    color: 'white',
  },

  subTitleStyle: {
    ...GlobalStyle.textRegular,
    color: 'white',
    fontSize: 14,
  },
})

export default styles
