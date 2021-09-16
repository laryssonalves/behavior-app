import React from 'react'
import { FlatList } from 'react-native'
import { ResultTypeChoice, resultTypeChoiceList } from '../../../../../entities/choices'
import ResultButton from './ResultButton'
import styles from './styles'

interface OptionListProps {
  targetResultType: ResultTypeChoice
  setTargetResultType: (resultType: ResultTypeChoice) => void
}

const OptionList = ({ targetResultType, setTargetResultType }: OptionListProps) => (
  <FlatList
    horizontal
    contentContainerStyle={styles.flatList}
    data={resultTypeChoiceList().filter(resultChoice => resultChoice.value !== ResultTypeChoice.NOT_APPLIED)}
    renderItem={({ item: { value } }) => {
      const resultType = value as ResultTypeChoice

      const isSelected = resultType === targetResultType
      return <ResultButton resultType={resultType} onPress={setTargetResultType} isSelected={isSelected} size={35} />
    }}
    keyExtractor={item => item.value.toString()}
  />
)

export default OptionList
