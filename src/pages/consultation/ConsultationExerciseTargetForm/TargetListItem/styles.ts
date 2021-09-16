import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR, PRIMARY_TEXT_COLOR } from '../../../../colors'
import GlobalStyle from '../../../../styles/global-style'

const styles = StyleSheet.create({
  flatListItem: {
    paddingHorizontal: 8,
  },

  textTarget: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16,
  },

  textTargetAnswered: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16,
    flex: 1,
  },

  dividerItem: {
    height: 2,
  },

  dividerAttempts: {
    height: 2,
    marginVertical: 16,
    backgroundColor: PRIMARY_COLOR,
  },

  itemOptions: {
    paddingTop: 8,
  },

  itemAnswered: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
})

export default styles
