import React, { useEffect, useState } from 'react'

import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { Divider, ProgressBar } from 'react-native-paper'

import GlobalStyle from '../../../styles/global-style'
import styles from './styles'
import { PRIMARY_COLOR } from '../../../colors'

import ConsultationDetailActionBar from './ActionBar'
import { Consultation, ConsultationExercise } from '../../../entities/consultation'

class HeaderState {
  searchBar = {
    visible: false,
    query: '',
  }
  actionBar = {
    title: 'Detalhes',
    subTitle: ''
  }
}

type ConsultationDetailParams = {
  Params: {
    consultation: string
  }
}


const ConsultationDetail = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ConsultationDetailParams, 'Params'>>()
  
  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())
  const [consultation, setConsultation] = useState<Consultation>(Consultation.fromJson(route.params.consultation))
  const [progressVisible, setProgressVisible] = useState<boolean>(false)

  const goToConsultationExerciseDetail = (consultationExercise: ConsultationExercise) => {

  }

  const setSearchBarQuery = (query: string) => { 
    const searchBar = { ...headerState.searchBar, query }
    setHeaderState({ ...headerState, searchBar }) 
  }

  const setSearchBarVisible = (visible: boolean) => {
    const searchBar = { ...headerState.searchBar, visible, query: visible ? headerState.searchBar.query : '' }
    setHeaderState({ ...headerState, searchBar })
  }

  const renderItem = (consultationExercise: ConsultationExercise, index: number) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          goToConsultationExerciseDetail(consultationExercise)
        }}
        style={styles.flatListItem}
      >
        <Text style={styles.textItemName}>{consultationExercise.exercise.program}</Text>
        <Text style={styles.textItemAge}>{consultationExercise.exercise.getApplicationTypeDescription()}</Text>
      </TouchableOpacity>
      {index !== consultation.exercises.length - 1 ? (
        <Divider style={styles.dividerItem} />
      ) : null}
    </View>
  )

  const headerProps = {
    headerState, 
    actions: {
      setSearchBarQuery,
      setSearchBarVisible,
      goBack: navigation.goBack
    },
  }

  useEffect(() => {
    const consultation = Consultation.fromJson(route.params.consultation)
    const newHeaderState = { 
      ...headerState, 
      actionBar: { 
        title: consultation.student.name,
        subTitle: `Terapeuta: ${consultation.owner.name}` 
      } 
    }
    setHeaderState(newHeaderState)
    console.log(consultation)
  }, [])

  return (
      <View style={GlobalStyle.container}>
        <ConsultationDetailActionBar {...headerProps} />
        
        <ProgressBar
          style={styles.progressBar}
          visible={progressVisible}
          color={PRIMARY_COLOR}
          indeterminate
        />

        <FlatList
          style={styles.flatList}
          data={consultation.exercises}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
  )
}

export default ConsultationDetail
