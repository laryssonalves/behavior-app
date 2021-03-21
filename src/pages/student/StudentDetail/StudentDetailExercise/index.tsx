import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity
} from 'react-native'

import { Divider } from 'react-native-paper'

import { StudentExercise } from '../../../../entities/student'

import { getStudentExercises } from '../../../../services/student-exercise-service'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../../colors'

import styles from './styles'
import GlobalStyle from '../../../../styles/global-style'

const renderItem = (studentExercise: StudentExercise, lastItem: boolean) => (
  <View>
    <TouchableOpacity
      onPress={() => console.log('exercise')}
      style={styles.flatListItem}
    >
      <Text style={styles.textItemName}>{studentExercise.program}</Text>
      <Text style={styles.textItemAge}>
        {studentExercise.getApplicationTypeDescription()}
      </Text>
    </TouchableOpacity>
    {lastItem && <Divider style={styles.dividerItem} />}
  </View>
)

const refreshControl = (
  <RefreshControl
    progressBackgroundColor="#FFF"
    colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
    refreshing={false}
  />
)

const StudentDetailExercise = ({ exercises }: any) => {
  return (
    <View style={GlobalStyle.container}>
      <FlatList
        style={styles.flatList}
        data={exercises}
        refreshControl={refreshControl}
        renderItem={({ item, index }) =>
          renderItem(item, index !== exercises.length - 1)
        }
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default StudentDetailExercise
