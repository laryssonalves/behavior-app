import React from 'react'
import { IconButton } from 'react-native-paper'
import { SECONDARY_TEXT_COLOR } from '../../../../../../colors'
import { resulTypeColorMap, resulTypeIconMap } from '../../../../../../constants'
import { ResultTypeChoice } from '../../../../../../entities/choices'

interface ResultButtonProps {
  resultType: ResultTypeChoice
  onPress: ((resultType: ResultTypeChoice) => void) | null
  isSelected: boolean
  size: number
}

const ResultButton = ({ resultType, onPress, isSelected, size }: ResultButtonProps) => (
  <IconButton
    icon={resulTypeIconMap[resultType]}
    size={size}
    color={isSelected ? resulTypeColorMap[resultType] : SECONDARY_TEXT_COLOR}
    onPress={onPress ? () => onPress(resultType) : () => {}}
    key={resultType.toString()}
  />
)

export default ResultButton
