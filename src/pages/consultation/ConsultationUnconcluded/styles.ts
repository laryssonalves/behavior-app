import { StyleSheet } from 'react-native'
import GlobalStyle from '../../../styles/global-style'

const styles = StyleSheet.create({
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowInfoField: {
    ...GlobalStyle.textMedium,
    flexBasis: '30%',
  },

  rowInfoValueContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },

  rowInfoValue: {
    ...GlobalStyle.textRegular,
  },

  btnDefault: {
    ...GlobalStyle.btnDefault,
    width: '48%',
  },

  btnPrimary: {
    ...GlobalStyle.btnPrimary,
    width: '48%',
  },
})

export default styles
