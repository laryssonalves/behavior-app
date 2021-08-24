import React from "react"

import { View, Text, FlatList } from "react-native"

import { ConsultationExerciseTarget } from "../../../../../entities/consultation"
import { isLastIndex } from "../../../../../utils"

import ExerciseTargetListItem from "./ExerciseTargetListItem"

import styles from "./styles"

const ExerciseTargetList = ({targets, exerciseTargetsTotal}: any) => {
  const renderListItem = (item: ConsultationExerciseTarget, index: number) => {
    const props = {
      item,
      exerciseTargetsTotal,
      index,
      isLastIndex: isLastIndex(index, targets)
    }
    return <ExerciseTargetListItem {...props}/>
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Resultados por alvo</Text>
      <FlatList
        data={targets}
        renderItem={({ item, index }) => renderListItem(item, index)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default ExerciseTargetList