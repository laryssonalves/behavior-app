import React from "react"

import { View, Text } from "react-native"
import { Divider } from "react-native-paper"

import { ResultTypeChoice } from "../../../../../../entities/choices"
import { isDivisible } from "../../../../../../utils"

import styles from "./styles"

const ExerciseTargetListItem = ({item, exerciseTargetsTotal, index, isLastIndex}: any) => (
  <>
  <View style={styles.itemContainer}> 
      <View style={styles.itemDescription}>
        <Text style={styles.itemText}>{item.sequence}. {item.student_target.target}</Text>
      </View>
      <View style={styles.itemResults}>
        <Text style={styles.itemText}>{item.checkResult(ResultTypeChoice.INDEPENDENT) ? 1 : 0}</Text>
        <Text style={styles.itemText}>{item.checkResult(ResultTypeChoice.CORRECT_WITH_HELP) ? 1 : 0}</Text>
        <Text style={styles.itemText}>{item.checkResult(ResultTypeChoice.WRONG) ? 1 : 0}</Text>
      </View>
    </View>
    {!isLastIndex && isDivisible(index + 1, exerciseTargetsTotal) && <Divider style={styles.divider}/>}
  </>
)

export default ExerciseTargetListItem