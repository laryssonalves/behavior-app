import { StyleSheet } from 'react-native'
import { PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from '../../../../../colors'
import GlobalStyle from '../../../../../styles/global-style'

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderColor: SECONDARY_TEXT_COLOR,
    borderWidth: 0.2,
    borderRadius: 4,
  },

  title: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 14,
    marginTop: 4,
  },

  containerDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  detailTitle: {
    ...GlobalStyle.textMedium,
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14,
  },

  detailInfo: {
    ...GlobalStyle.textMedium,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 14,
  },
})

export default styles
