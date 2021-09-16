import { StyleSheet } from 'react-native'

import GlobalStyle from '../../../styles/global-style'
import { PRIMARY_COLOR, PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from '../../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  progressBar: {
    height: 8,
  },

  flatList: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  flatListItem: {
    padding: 8,
  },

  textItemName: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16,
  },

  textItemAge: {
    ...GlobalStyle.textMedium,
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14,
  },

  dividerItem: {
    marginHorizontal: 8,
    height: 2,
  },

  fabAdd: {
    position: 'absolute',
    backgroundColor: PRIMARY_COLOR,
    margin: 24,
    right: 0,
    bottom: 0,
  },
})

export default styles
