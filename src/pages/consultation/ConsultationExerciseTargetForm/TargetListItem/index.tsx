import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Colors, Divider, IconButton } from 'react-native-paper'
import { SECONDARY_TEXT_COLOR } from '../../../../colors'
import { ResultTypeChoice, resultTypeChoiceList } from '../../../../entities/choices'
import { ConsultationExerciseTarget } from '../../../../entities/consultation'
import { isDivisible, isLastIndex } from '../../../../utils'

import styles from './styles'

interface TargetListItemProps {
  consultationExerciseTarget: ConsultationExerciseTarget
  index: number
  targetState: any,
  concluded: boolean,
  exerciseTargetsTotal: number
}

const TargetListItem = (props: TargetListItemProps) => {
  const {consultationExerciseTarget, index, targetState, concluded, exerciseTargetsTotal} = props
  const {targets, setTargets} = targetState

  const setShowOptions = (showOptions: boolean) => {
    const newTarget = new ConsultationExerciseTarget({ 
      ...consultationExerciseTarget, showOptions
    })
    setNewTarget(newTarget)
  }

  const setResultType = (resultType: ResultTypeChoice) => {
    const newTarget = new ConsultationExerciseTarget({ 
      ...consultationExerciseTarget, result_type: resultType, showOptions: false
    })
    setNewTarget(newTarget)
  }

  const setNewTarget = (target: ConsultationExerciseTarget) => {
    const newTargets = [...targets]
    newTargets[index] = target
    setTargets(newTargets)
  }

  const getResultTypeIconColor = (resultType: ResultTypeChoice): string => { 
    switch (resultType) {
      case ResultTypeChoice.WRONG:
        return Colors.red500
      case ResultTypeChoice.CORRECT_WITH_HELP:
        return Colors.blue500
      case ResultTypeChoice.INDEPENDENT:
          return Colors.green500
      default:
        return SECONDARY_TEXT_COLOR
    }
  }

  const getResultTypeIcon = (resultType: ResultTypeChoice): string => { 
    switch (resultType) {
      case ResultTypeChoice.WRONG:
        return 'close'
      case ResultTypeChoice.CORRECT_WITH_HELP:
        return 'check-circle'
      case ResultTypeChoice.INDEPENDENT:
          return 'check'
      default:
        return ''
    }
  }

  const getOptionColor = (resultType: ResultTypeChoice): string => {
    return consultationExerciseTarget.result_type === resultType ? getResultTypeIconColor(resultType) : SECONDARY_TEXT_COLOR
  }

  const ListOptions = () => (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatListItemOptionsContainer}
      data={resultTypeChoiceList().filter(resultChoice => resultChoice.value != ResultTypeChoice.NOT_APPLIED)}
      renderItem={({ item: { value }, index }) => {
        const resultType = value as ResultTypeChoice
  
        return (
          <IconButton 
            icon={getResultTypeIcon(resultType)}
            size={35}
            color={getOptionColor(resultType)}
            onPress={() => { setResultType(resultType) }}
            key={resultType.toString()}/>
        )
      }}
      keyExtractor={item => item.value.toString()}
    />
  )

  const ItemOptions = () => (
    <View style={styles.flatListItemOptions}>
      <Text style={styles.textTarget}>{consultationExerciseTarget.sequence}. {consultationExerciseTarget.student_target.target}</Text>
      <ListOptions />
    </View>
  )

  const ItemAnswered = () => (
    <TouchableOpacity 
      style={styles.flatListItemAnswered}
      onPress={() => !concluded && setShowOptions(true)}>
      <Text style={styles.textTargetAnswered}>{consultationExerciseTarget.sequence}. {consultationExerciseTarget.student_target.target}</Text>
      <IconButton 
        icon={getResultTypeIcon(consultationExerciseTarget.result_type)}
        size={20}
        color={getResultTypeIconColor(consultationExerciseTarget.result_type)}
      />
    </TouchableOpacity>
  )

  return (
    <View style={styles.flatListItem}>
      {consultationExerciseTarget.showOptions && !concluded? <ItemOptions /> : <ItemAnswered />}
      {!isLastIndex(index, targets) && ( <Divider style={isDivisible(index + 1, exerciseTargetsTotal) ? styles.dividerAttempts : styles.dividerItem} /> ) }
    </View>
  )
}

export default TargetListItem