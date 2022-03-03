import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../../../colors'
import GlobalStyle from '../../../styles/global-style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  progressBar: {
    height: 8,
  },

  body: {
    flex: 1,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },

  flatList: {
    marginBottom: 8
  },

  actionsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  btnDefault: {
    ...GlobalStyle.btnDefault,
    backgroundColor: '#fff',
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    width: '48%',
  },

  btnPrimary: {
    ...GlobalStyle.btnPrimary,
    width: '48%',
  }
})

export default styles
