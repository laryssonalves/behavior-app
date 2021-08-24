import React from "react"
import { View, Text, FlatList } from "react-native"
import { ResultTypeChoice } from "../../../../../entities/choices"
import styles from "./styles"

const ExerciseTargetListItem = ({item}: any) => (
  <View> 
    <View style={styles.listItemDescription}>
      <Text style={styles.listItemText}>{item.student_target.target}</Text>
    </View>
    <View style={styles.listItemResults}>
      <Text style={styles.listItemText}>{item.checkResult(ResultTypeChoice.INDEPENDENT) ? 1 : 0}</Text>
      <Text style={styles.listItemText}>{item.checkResult(ResultTypeChoice.CORRECT_WITH_HELP) ? 1 : 0}</Text>
      <Text style={styles.listItemText}>{item.checkResult(ResultTypeChoice.WRONG) ? 1 : 0}</Text>
    </View>
  </View>
)


const ExerciseTargetList = ({consultationExercise}: any) => (
  <View style={styles.listContainer}>
    <Text style={styles.listTitle}>Resultados por alvo</Text>
    <FlatList
      data={consultationExercise.targets}
      renderItem={({ item, index }) => <ExerciseTargetListItem item={consultationExercise} />}
      keyExtractor={item => item.id.toString()}
    />
  </View>
)

export default ExerciseTargetList