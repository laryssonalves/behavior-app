import { StyleSheet } from 'react-native'
import { PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from '../../../colors'
import GlobalStyle from '../../../styles/global-style'

const styles = StyleSheet.create({
  textEmptyList: {
    ...GlobalStyle.textMedium,
    fontSize: 16,
  },

  flatListItem: {
    padding: 8,
    flexDirection: 'row',
    minWidth: '100%'
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    flexDirection: 'row'
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
  },
  
  btnDefault: {
    ...GlobalStyle.btnDefault,
    width: '48%'
  },

  btnPrimary: {
    ...GlobalStyle.btnPrimary,
    width: '48%',
  },
  
})

export default styles
