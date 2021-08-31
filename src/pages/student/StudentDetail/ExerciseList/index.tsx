import React from 'react'

import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native'

import { Divider } from 'react-native-paper'

import { isLastIndex } from '../../../../utils'
import { StudentExercise } from '../../../../entities/student'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../../colors'

import styles from './styles'
import GlobalStyle from '../../../../styles/global-style'

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
        <Text style={styles.textItemAge}>{studentExercise.getApplicationTypeDescription()}</Text>
      </TouchableOpacity>
      {!isLast && <Divider style={styles.dividerItem} />}
    </View>
  )

  return (
    <View style={GlobalStyle.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={exercises}
        refreshControl={refreshControl}
        renderItem={({ item, index }) => renderItem(item, isLastIndex(index, exercises))}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default ExcerciseList
