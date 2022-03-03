import { StyleSheet } from 'react-native'
import { PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from '../../../colors'
import GlobalStyle from '../../../styles/global-style'

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
    flexDirection: 'row',
  },

  textItemProgram: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16,
  },

  textItemApplication: {
    ...GlobalStyle.textMedium,
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14,
  },

  dividerItem: {
    marginHorizontal: 8,
    height: 2,
  },

  btnPrimary: {
    ...GlobalStyle.btnPrimary,
    alignSelf: 'center',
    marginBottom: 16,
  },
})

export default styles
