import { StyleSheet } from "react-native";
import { SECONDARY_TEXT_COLOR } from "../../../../../../colors";
import GlobalStyle from "../../../../../../styles/global-style";

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row"
  },

  itemDescription: {
    flexBasis: "80%",
  },

  itemResults: {
    flexBasis: "20%", 
    justifyContent: "space-between",
    flexDirection: "row"
  },

  itemText: {
    ...GlobalStyle.textMedium,
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14
  },

  divider: {
    height: 0.5, 
    marginVertical: 4
  }
})

export default styles