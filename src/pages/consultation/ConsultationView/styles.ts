import { StyleSheet } from "react-native";
import { LIST_ITEM_BACKGROUD, PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from "../../../colors";
import GlobalStyle from "../../../styles/global-style";

const styles = StyleSheet.create({
  flatList: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 16
  },

  subFlatList: {
    paddingBottom: 8,
    paddingHorizontal: 8,
    marginBottom: 8
  },

  flatListItem: {
    padding: 8,
    flexDirection: 'row',
    backgroundColor: LIST_ITEM_BACKGROUD,
    borderRadius: 4,
    marginVertical: 4,
  },

  textItemProgram: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16
  },

  textItemApplication: {
    ...GlobalStyle.textMedium,
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14
  },

  titleSubFlatList: {
    ...GlobalStyle.textMedium,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 14,
    marginTop: 4
  },

  textItemTarget: {
    ...GlobalStyle.textMedium,
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14
  },

  progressBar: {
    height: 8
  },

  dividerItem: {
    marginHorizontal: 8,
    height: 2,
  },
})

export default styles