import React from 'react'

import { View, Text, FlatList } from 'react-native'

import { ConsultationExercise, ConsultationExerciseTarget } from '../../../../../entities/consultation'
import { isLastIndex } from '../../../../../utils'

import ExerciseTargetListItem from './ExerciseTargetListItem'

import styles from './styles'

interface ExerciseTargetListProps {
  consultationExercise: ConsultationExercise
}

const ExerciseTargetList = ({ consultationExercise }: ExerciseTargetListProps) => {
  const renderListItem = (item: ConsultationExerciseTarget, index: number) => {
    const props = {
      item,
      index,
      exerciseTargetsTotal: consultationExercise.exercise.total_targets,
      isLastIndex: isLastIndex(index, consultationExercise.targets),
    }

    return <ExerciseTargetListItem {...props} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerDetail}>
        <Text style={styles.detailTitle}>Tentativas</Text>
        <Text style={styles.detailInfo}>
          {consultationExercise.total_targets_answered}/{consultationExercise.exercise.total_attempts}
        </Text>
      </View>
      <View style={styles.containerDetail}>
        <Text style={styles.detailTitle}>Respostas corretas</Text>
        <Text style={styles.detailInfo}>{consultationExercise.total_targets_correct}</Text>
      </View>
      <View style={styles.containerDetail}>
        <Text style={styles.detailTitle}>Porcentagem de acerto</Text>
        <Text style={styles.detailInfo}>{consultationExercise.percentage_correct_targets}%</Text>
      </View>
      <Text style={styles.title}>Resultado detalhado</Text>
      <FlatList
        data={consultationExercise.targets}
        renderItem={({ item, index }) => renderListItem(item, index)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default ExerciseTargetList
