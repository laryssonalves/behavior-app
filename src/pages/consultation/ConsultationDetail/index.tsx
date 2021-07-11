import React, { useEffect, useState } from 'react'

import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { Divider, IconButton, ProgressBar } from 'react-native-paper'

import GlobalStyle from '../../../styles/global-style'
import styles from './styles'
import { PRIMARY_COLOR, SECONDARY_TEXT_COLOR, TERCIARY_COLOR } from '../../../colors'

import ConsultationDetailActionBar from './ActionBar'
import { Consultation, ConsultationExercise } from '../../../entities/consultation'
import { HeaderState } from '../../../entities/header-state'
import { getConsultationExercises } from '../../../services/consultation-service'

type ConsultationDetailParams = {
  Params: {
    consultation: string
  }
}

const ConsultationDetail = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ConsultationDetailParams, 'Params'>>()
  const consultation = Consultation.fromJson(route.params.consultation)
  
  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())
  const [exercises, setExercises] = useState<ConsultationExercise[]>([])
  const [progressVisible, setProgressVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const showProgress = () => setProgressVisible(true)
  const hideProgress = () => setProgressVisible(false)

  const goToConsultationExerciseList = (consultationExercise: ConsultationExercise) => {
    const params = { consultationExercise: consultationExercise.toJson() }
    navigation.navigate('ConsultationExerciseTargetForm', params)
  }

  const renderItem = (consultationExercise: ConsultationExercise, index: number) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          goToConsultationExerciseList(consultationExercise)
        }}
        style={styles.flatListItem}>
        <View style={{flex: 1}}>
          <Text style={styles.textItemName}>{consultationExercise.exercise.program}</Text>
          <Text style={styles.textItemAge}>{consultationExercise.exercise.getApplicationTypeDescription()}</Text>
        </View>
        {
          consultationExercise.concluded && 
          <IconButton
            icon="lock"
            color={SECONDARY_TEXT_COLOR}
            size={20}/>
        }
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

  const getHeaderState = () => {
    const newHeaderState = { 
      ...headerState, 
      actionBar: { 
        title: consultation.student.name,
        subTitle: `Terapeuta: ${consultation.owner.name}` 
      } 
    }
    setHeaderState(newHeaderState)
  }

  const getExercises = () => {
    showProgress()
    
    getConsultationExercises(consultation.id)
      .then(exercises => setExercises(exercises))
      .finally(() => hideProgress())
  }
  
  const concludeConsultation = () => {
    
  }

  useEffect(() => {
    getHeaderState()
  }, [])

  useEffect(() => navigation.addListener('focus', getExercises))

  useEffect(() => navigation.addListener('beforeRemove', concludeConsultation))

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
        data={exercises}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={item => item.id.toString()}
      />

      <TouchableOpacity
        style={{...GlobalStyle.btnPrimary, alignSelf: 'center', marginBottom: 16}}
        onPress={() => {}}>
        {
          loading ?
            <ActivityIndicator animating={true} color={TERCIARY_COLOR} /> :
            <Text style={GlobalStyle.btnPrimaryText}>Concluir atendimento</Text>
        }
      </TouchableOpacity>
    </View>
  )
}

export default ConsultationDetail
