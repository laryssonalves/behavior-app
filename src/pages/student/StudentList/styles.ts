import { StyleSheet } from 'react-native'
import GlobalStyle from '../../../global-style'
import { PRIMARY_TEXT_COLOR, SECONDARY_COLOR, SECONDARY_TEXT_COLOR } from '../../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  toolbar: {
    justifyContent: 'center',
    backgroundColor: SECONDARY_COLOR,
    height: 56,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 32, height: 32 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 32
  },

  toolbarTitle: {
    ...GlobalStyle.textMedium,
    fontSize: 18,
    color: 'white'
  },

  toolbarSubTitle: {
    fontSize: 14,
    color: 'white',
    ...GlobalStyle.textRegular
  },

  progressBar: {
    height: 6
  },

  flatList: {
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
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
    margin: 8
  }
})

export default styles