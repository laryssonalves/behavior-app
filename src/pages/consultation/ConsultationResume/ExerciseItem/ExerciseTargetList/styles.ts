import { StyleSheet } from "react-native";
import { PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from "../../../../../colors";
import GlobalStyle from "../../../../../styles/global-style";

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 8,
    paddingHorizontal: 8,
    marginBottom: 8
  },

  listTitle: {
    ...GlobalStyle.textMedium,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 14,
    marginTop: 4
  },

  listItemDescription: {
    flexBasis: "80%"
  },

  listItemResults: {
    flexBasis: "20%", 
    justifyContent: "space-between"
  },

  listItemText: {
    ...GlobalStyle.textMedium,
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14
  },
})

export default styles