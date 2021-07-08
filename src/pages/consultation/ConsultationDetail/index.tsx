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
import { HeaderState } from '../../../entities/header-state'

type ConsultationDetailParams = {
  Params: {
    consultation: string
  }
}

const ConsultationDetail = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ConsultationDetailParams, 'Params'>>()
  
  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())
  const [exercises, setExercises] = useState<ConsultationExercise[]>([])

  const goToConsultationExerciseList = (consultationExercise: ConsultationExercise) => {
    const params = {
      consultationId: consultationExercise.consultation_id,
      consultationExerciseId: consultationExercise.id, 
      program: consultationExercise.exercise.program,
      applicationTypeDescription: consultationExercise.exercise.getApplicationTypeDescription() 
    }

    navigation.navigate('ConsultationExerciseTargetForm', params)
  }

  const renderItem = (consultationExercise: ConsultationExercise, index: number) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          goToConsultationExerciseList(consultationExercise)
        }}
        style={styles.flatListItem}>
        <Text style={styles.textItemName}>{consultationExercise.exercise.program}</Text>
        <Text style={styles.textItemAge}>{consultationExercise.exercise.getApplicationTypeDescription()}</Text>
      </TouchableOpacity>
      {index !== exercises.length - 1 && (<Divider style={styles.dividerItem} />)}
    </View>
  )

  const headerProps = {
    headerState, 
    actions: {
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
    setExercises(consultation.exercises)
  }, [])

  return (
      <View style={GlobalStyle.container}>
        <ConsultationDetailActionBar {...headerProps} />

        <FlatList
          style={styles.flatList}
          data={exercises}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
  )
}

export default ConsultationDetail
