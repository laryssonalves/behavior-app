import { StyleSheet } from "react-native"
import GlobalStyle from "../../../styles/global-style"

const styles = StyleSheet.create({
  inputView: {
    ...GlobalStyle.inputView,
    marginBottom: 0,
  },

  inputViewError: {
    ...GlobalStyle.inputViewError,
    marginBottom: 0,
  }
})

export default styles