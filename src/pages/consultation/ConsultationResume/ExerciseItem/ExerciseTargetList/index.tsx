import React from 'react'

import { View, Text, FlatList } from 'react-native'

import { ConsultationExercise, ConsultationExerciseTarget } from '../../../../../entities/consultation'
import { isLastIndex, percentage } from '../../../../../utils'

import ExerciseTargetListItem from './ExerciseTargetListItem'

import styles from './styles'

interface ExerciseTargetListProps {
  consultationExercise: ConsultationExercise
}

const ExerciseTargetList = ({ consultationExercise }: ExerciseTargetListProps) => {
  const { total_targets_answered, exercise, result, targets } = consultationExercise

  const renderListItem = (item: ConsultationExerciseTarget, index: number) => {
    const props = {
      item,
      index,
      exerciseTargetsTotal: exercise.total_targets,
      isLastIndex: isLastIndex(index, targets),
    }

    return <ExerciseTargetListItem {...props} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerDetail}>
        <Text style={styles.detailTitle}>Tentativas</Text>
        <Text style={styles.detailInfo}>
          {total_targets_answered}/{exercise.total_attempts}
        </Text>
      </View>
      <View style={styles.containerDetail}>
        <Text style={styles.detailTitle}>Corretas independentes</Text>
        <Text style={styles.detailInfo}>{result.result_indepent}</Text>
      </View>
      <View style={styles.containerDetail}>
        <Text style={styles.detailTitle}>Porcentagem de acerto com ajuda</Text>
        <Text style={styles.detailInfo}>{percentage(result.result_indepent, targets.length)}%</Text>
      </View>
      <View style={styles.containerDetail}>
        <Text style={styles.detailTitle}>Corretas com ajuda</Text>
        <Text style={styles.detailInfo}>{result.result_correct_with_help}</Text>
      </View>
      <View style={styles.containerDetail}>
        <Text style={styles.detailTitle}>Porcentagem de acerto independente</Text>
        <Text style={styles.detailInfo}>{percentage(result.result_correct_with_help, targets.length)}%</Text>
      </View>
      <Text style={styles.title}>Resultado detalhado</Text>
      <FlatList
        data={targets}
        renderItem={({ item, index }) => renderListItem(item, index)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default ExerciseTargetList
