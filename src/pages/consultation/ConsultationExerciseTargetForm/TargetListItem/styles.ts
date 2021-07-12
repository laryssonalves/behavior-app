import { StyleSheet } from "react-native";
import { PRIMARY_TEXT_COLOR } from "../../../../colors";
import GlobalStyle from "../../../../styles/global-style";

const styles = StyleSheet.create({
  flatListItem: {
    paddingHorizontal: 8,
  },

  textTarget: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16
  },

  textTargetAnswered: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16,
    flex: 1
  },

  dividerItem: {
    height: 2,
  },

  flatListItemOptions: {
    paddingTop: 8
  },

  flatListItemOptionsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around'
  },

  flatListItemAnswered: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 8
  }
})

export default styles