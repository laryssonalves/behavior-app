import { StyleSheet } from 'react-native'
import { LIST_ITEM_BACKGROUD, PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from '../../../../colors'
import GlobalStyle from '../../../../styles/global-style'

const styles = StyleSheet.create({
  listItem: {
    padding: 8,
    flexDirection: 'row',
    backgroundColor: LIST_ITEM_BACKGROUD,
    borderRadius: 4,
    marginVertical: 4,
  },

  listItemTextProgram: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16,
  },

  listItemTextApplication: {
    ...GlobalStyle.textMedium,
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14,
  },

  listItemInfo: {
    flexBasis: '80%',
  },

  listItemResult: {
    flexBasis: '20%',
    justifyContent: 'space-between',
  },

  listItemResultAnswer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  listItemResultAnswerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  listItemResultAnswerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default styles
