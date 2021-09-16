import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Divider } from 'react-native-paper'
import { ResultTypeChoice } from '../../../../entities/choices'
import { ConsultationExerciseTarget } from '../../../../entities/consultation'
import { isDivisible, isLastIndex } from '../../../../utils'
import OptionList from './OptionList'
import ResultButton from './OptionList/ResultButton'

import styles from './styles'

interface TargetListItemProps {
  consultationExerciseTarget: ConsultationExerciseTarget
  index: number
  targetState: any
  concluded: boolean
  exerciseTargetsTotal: number
}

const TargetListItem = (props: TargetListItemProps) => {
  const { consultationExerciseTarget, index, targetState, concluded, exerciseTargetsTotal } = props
  const { targets, setTargets } = targetState

  const setShowOptions = (showOptions: boolean) => {
    const newTarget = new ConsultationExerciseTarget({
      ...consultationExerciseTarget,
      showOptions,
    })
    setNewTarget(newTarget)
  }

  const setResultType = (resultType: ResultTypeChoice) => {
    const newTarget = new ConsultationExerciseTarget({
      ...consultationExerciseTarget,
      result_type: resultType,
      showOptions: false,
    })
    setNewTarget(newTarget)
  }

  const setNewTarget = (target: ConsultationExerciseTarget) => {
    const newTargets = [...targets]
    newTargets[index] = target
    setTargets(newTargets)
  }

  const ItemOptions = () => (
    <View style={styles.itemOptions}>
      <Text style={styles.textTarget}>
        {consultationExerciseTarget.sequence}. {consultationExerciseTarget.student_target.target}
      </Text>
      <OptionList targetResultType={consultationExerciseTarget.result_type} setTargetResultType={setResultType} />
    </View>
  )

  const ItemAnswered = () => (
    <TouchableOpacity style={styles.itemAnswered} onPress={() => !concluded && setShowOptions(true)}>
      <Text style={styles.textTargetAnswered}>
        {consultationExerciseTarget.sequence}. {consultationExerciseTarget.student_target.target}
      </Text>
      <ResultButton resultType={consultationExerciseTarget.result_type} onPress={null} isSelected={true} size={20} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.flatListItem}>
      {consultationExerciseTarget.showOptions && !concluded ? <ItemOptions /> : <ItemAnswered />}
      {!isLastIndex(index, targets) && (
        <Divider style={isDivisible(index + 1, exerciseTargetsTotal) ? styles.dividerAttempts : styles.dividerItem} />
      )}
    </View>
  )
}

export default TargetListItem
