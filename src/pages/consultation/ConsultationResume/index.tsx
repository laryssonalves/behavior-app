import React, { useEffect, useState } from 'react'

import { View, FlatList, RefreshControl } from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { ProgressBar } from 'react-native-paper'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'
import { Consultation, ConsultationExercise } from '../../../entities/consultation'
import { HeaderState } from '../../../entities/header-state'
import * as ConsultationService from '../../../services/consultation-service'
import GlobalStyle from '../../../styles/global-style'
import ConsultationViewActionBar from './ActionBar'
import ExerciseItem from './ExerciseItem'
import styles from './styles'

type ConsultationViewParams = {
  Params: {
    consultation: string
  }
}

const ConsultationResume = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ConsultationViewParams, 'Params'>>()

  const consultation = Consultation.fromJson(route.params.consultation)
  const [exercises, setExercises] = useState<ConsultationExercise[]>([])
  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())
  const [progressVisible, setProgressVisible] = useState<boolean>(false)

  const showProgress = () => setProgressVisible(true)
  const hideProgress = () => setProgressVisible(false)

  const headerProps = {
    headerState,
    actions: {
      goBack: navigation.goBack,
    },
  }

  const getExercises = () => {
    showProgress()

    ConsultationService.getConsultationExercises(consultation.id)
      .then(results => setExercises(results))
      .finally(() => hideProgress())
  }

  const getHeaderState = () => {
    const newHeaderState = {
      ...headerState,
      actionBar: {
        title: 'Detalhes do atendimento',
        subTitle: `${consultation?.student.name} - Terapeuta: ${consultation?.owner.name}`,
      },
    }
    setHeaderState(newHeaderState)
  }

  const refreshControl = (
    <RefreshControl
      progressBackgroundColor="#FFF"
      colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
      refreshing={false}
      onRefresh={getExercises}
    />
  )

  const initComponent = () => {
    getExercises()
    getHeaderState()
  }

  useEffect(initComponent, [])

  return (
    <View style={GlobalStyle.container}>
      <ConsultationViewActionBar {...headerProps} />

      <ProgressBar style={styles.progressBar} visible={progressVisible} color={PRIMARY_COLOR} indeterminate />

      <FlatList
        style={styles.flatList}
        refreshControl={refreshControl}
        data={exercises}
        renderItem={({ item, index }) => <ExerciseItem {...{ consultationExercise: item }} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default ConsultationResume
