import React from 'react'

import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native'

import { Divider } from 'react-native-paper'

import { isLastIndex } from '../../../../utils'
import { StudentExercise } from '../../../../entities/student'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../../colors'

import styles from './styles'
import EmptyList from '../../../../shared/components/EmptyList'

const ExcerciseList = ({ exercises, refreshList }: any) => {
  const refreshControl = (
    <RefreshControl
      progressBackgroundColor="#FFF"
      colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
      refreshing={false}
      onRefresh={async () => await refreshList()}
    />
  )

  const renderItem = (studentExercise: StudentExercise, isLast: boolean) => (
    <View>
      <TouchableOpacity style={styles.flatListItem}>
        <Text style={styles.textItemName}>{studentExercise.program}</Text>
        <Text style={styles.textItemAge}>{studentExercise.application_type_description}</Text>
      </TouchableOpacity>
      {!isLast && <Divider style={styles.dividerItem} />}
    </View>
  )

  return (
    <View style={styles.container}>
      {!exercises.length ? (
        <EmptyList text="Nenhum programa de ensino encontrado" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={exercises}
          refreshControl={refreshControl}
          renderItem={({ item, index }) => renderItem(item, isLastIndex(index, exercises))}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  )
}

export default ExcerciseList
