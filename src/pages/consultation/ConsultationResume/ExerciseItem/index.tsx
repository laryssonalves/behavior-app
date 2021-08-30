import React, { useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

import { FontAwesome5 } from '@expo/vector-icons'

import ExerciseTargetList from './ExerciseTargetList'

import styles from './styles'

const ExerciseItem = ({ consultationExercise }: any) => {
  const [targetsVisible, setTargetsVisible] = useState(false)

  const toggleTargets = () => setTargetsVisible(!targetsVisible)

  const ExerciseInfo = () => (
    <View style={styles.listItemInfo}>
      <Text style={styles.listItemTextProgram}>{consultationExercise.exercise.program}</Text>
      <Text style={styles.listItemTextApplication}>
        {consultationExercise.exercise.getApplicationTypeDescription()}
      </Text>
    </View>
  )

  const ExerciseResultApplied = () => (
    <View style={styles.listItemResultAnswer}>
      <View style={styles.listItemResultAnswerIcons}>
        <FontAwesome5 name="check" color="green" />
        <FontAwesome5 name="check-circle" color="blue" />
        <FontAwesome5 name="times" color="red" />
      </View>
      <View style={styles.listItemResultAnswerTotal}>
        <Text style={styles.listItemTextApplication}>{consultationExercise.result.result_indepent}</Text>
        <Text style={styles.listItemTextApplication}>{consultationExercise.result.result_correct_with_help}</Text>
        <Text style={styles.listItemTextApplication}>{consultationExercise.result.result_wrong}</Text>
      </View>
    </View>
  )

  const ExerciseResult = () => (
    <View style={styles.listItemResult}>
      {!consultationExercise.is_applied ? (
        <Text style={styles.listItemTextApplication}>Não aplicado</Text>
      ) : (
        <ExerciseResultApplied />
      )}
    </View>
  )

  return (
    <View>
      <TouchableOpacity onPress={toggleTargets} disabled={!consultationExercise.is_applied} style={styles.listItem}>
        <ExerciseInfo />
        <ExerciseResult />
      </TouchableOpacity>
      {targetsVisible && <ExerciseTargetList consultationExercise={consultationExercise} />}
    </View>
  )
}

export default ExerciseItem
