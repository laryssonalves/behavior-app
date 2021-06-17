import React from 'react'

import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-paper'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../../colors'
import { Consultation } from '../../../../entities/consultation'
import { StudentExercise } from '../../../../entities/student'
import styles from './styles'

const ConsultationAdd = ({ exercises }: any) => {
  const renderItem = (exercise: StudentExercise, lastItem: boolean) => (
    <View>
      <TouchableOpacity 
        onPress={() => console.log('add exercise consultation')} 
        style={styles.flatListItem}>
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.textItemName}>{`Terapeuta: ${consultation.owner.name}`}</Text>
          <Text style={styles.textItemAge}>{consultation.getDuration()}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.textItemAge}>
            {consultation.create_date.format('DD/MM/YYYY')} 
          </Text>
          <Text style={styles.textItemAge}>
            {`${consultation.create_date.format('HH:mm')} às ${consultation.concluded_date.format('HH:mm')}`}
          </Text>
        </View> */}
      </TouchableOpacity>
      {lastItem && <Divider style={styles.dividerItem} />}
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item, index }) => renderItem(item, index !== exercises.length - 1)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default ConsultationAdd
