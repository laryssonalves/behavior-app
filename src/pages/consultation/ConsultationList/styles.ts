import { StyleSheet } from 'react-native'
import { PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from '../../../colors'
import GlobalStyle from '../../../styles/global-style'

const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.container,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 16
  },

  textEmptyList: {
    ...GlobalStyle.textMedium,
    fontSize: 16,
  },

  flatListItem: {
    padding: 8
  },

  textItemName: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16
  },

  textItemAge: {
    ...GlobalStyle.textMedium,
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14
  },

  dividerItem: {
    marginHorizontal: 8,
    height: 2
  }
})

export default styles
