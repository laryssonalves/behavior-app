import { StyleSheet } from 'react-native'
import GlobalStyle from '../../../styles/global-style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  text: {
    ...GlobalStyle.textMedium,
    fontSize: 16,
    marginTop: 16,
  },
})

export default styles
