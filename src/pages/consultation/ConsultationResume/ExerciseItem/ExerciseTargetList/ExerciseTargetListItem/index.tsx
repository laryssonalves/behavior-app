import React from 'react'

import { View, Text } from 'react-native'
import { Divider } from 'react-native-paper'

import { isDivisible } from '../../../../../../utils'

import styles from './styles'

const ExerciseTargetListItem = ({ item, index, exerciseTargetsTotal, isLastIndex }: any) => (
  <>
    <View style={styles.itemContainer}>
      <View style={styles.itemDescription}>
        <Text style={styles.itemText}>
          {item.sequence}. {item.target_description}
        </Text>
      </View>
      <View style={styles.itemResults}>
        <Text style={styles.itemText}>{item.isWrong() ? 1 : 0}</Text>
        <Text style={styles.itemText}>{item.isCorrectWithHelp() ? 1 : 0}</Text>
        <Text style={styles.itemText}>{item.isIndependent() ? 1 : 0}</Text>
      </View>
    </View>
    {!isLastIndex && isDivisible(index + 1, exerciseTargetsTotal) && <Divider style={styles.divider} />}
  </>
)

export default ExerciseTargetListItem
