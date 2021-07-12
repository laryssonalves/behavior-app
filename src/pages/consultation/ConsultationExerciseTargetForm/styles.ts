import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR, PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from '../../../colors'
import GlobalStyle from '../../../styles/global-style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  progressBar: {
    height: 8
  },

  flatList: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 16
  },
})

export default styles