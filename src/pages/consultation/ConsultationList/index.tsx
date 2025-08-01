import React from 'react'

import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Divider } from 'react-native-paper'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'
import { Consultation } from '../../../entities/consultation'
import styles from './styles'
import { isLastIndex } from '../../../utils'
import EmptyList from '../../../shared/components/EmptyList'

const ConsultationList = ({ consultations, refreshList }: any) => {
  const navigation = useNavigation()

  const refreshControl = (
    <RefreshControl
      progressBackgroundColor="#FFF"
      colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
      refreshing={false}
      onRefresh={async () => await refreshList()}
    />
  )

  const renderItem = (consultation: Consultation, lastItem: boolean) => (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ConsultationResume', { consultation: consultation.toJson() })}
        style={styles.flatListItem}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.textItemName}>{`Terapeuta: ${consultation.owner.name}`}</Text>
          <Text style={styles.textItemAge}>{consultation.getDuration()}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.textItemAge}>{consultation.create_date.format('DD/MM/YY')}</Text>
          <Text style={styles.textItemAge}>
            {`${consultation.create_date.format('HH:mm')} às ${consultation.concluded_date.format('HH:mm')}`}
          </Text>
        </View>
      </TouchableOpacity>
      {lastItem && <Divider style={styles.dividerItem} />}
    </View>
  )

  return (
    <View style={styles.container}>
      {!consultations.length ? (
        <EmptyList text="Nenhuma consulta encontrada" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={consultations}
          refreshControl={refreshControl}
          renderItem={({ item, index }) => renderItem(item, !isLastIndex(index, consultations))}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  )
}

export default ConsultationList
