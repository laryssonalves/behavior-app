import { StyleSheet } from "react-native";
import GlobalStyle from "../../../../styles/global-style";

const styles = StyleSheet.create({
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