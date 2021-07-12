import React, { useEffect, useState } from 'react'

import { FlatList, RefreshControl, View } from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import GlobalStyle from '../../../styles/global-style'
import styles from './styles'

import ConsultationExerciseTargetFormActionBar from './ActionBar'
import { ConsultationExercise, ConsultationExerciseTarget } from '../../../entities/consultation'
import { HeaderState } from '../../../entities/header-state'
import TargetListItem from './TargetListItem'
import { sendConsultationExerciseTargetAnswers, getConsultationExerciseTargets } from '../../../services/consultation-service'
import { ProgressBar } from 'react-native-paper'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'

type ConsultationExerciseTargetFormParams = {
  Params: {
    consultationExercise: string,
  }
}

const ConsultationExerciseTargetForm = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ConsultationExerciseTargetFormParams, 'Params'>>()
  const consultationExercise = ConsultationExercise.fromJson(route.params.consultationExercise)
  
  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())
  const [targets, setTargets] = useState<ConsultationExerciseTarget[]>([])
  const [saved, setSaved] = useState<boolean>(false)
  const [progressVisible, setProgressVisible] = useState<boolean>(false)

  const goBack = navigation.goBack

  const showProgress = () => setProgressVisible(true)
  const hideProgress = () => setProgressVisible(false)

  const saveApplication = (concluded?: boolean) => {
    showProgress()

    const {id, consultation_id} = consultationExercise

    const payload = {
      consultation_exercise: id,
      concluded: concluded === undefined ? consultationExercise.concluded : concluded,
      targets
    }

    sendConsultationExerciseTargetAnswers(consultation_id, payload)
      .then(() => { 
        setSaved(true)

        if (concluded) {
          goBack()
        }
      })
      .catch(e => console.log(e))
      .finally(() => hideProgress())
  }

  const concludeExercise = async () => {
    saveApplication(true)
  }

  const showResume = () => {
    const targetsResume = targets.map(target => {
      target.showOptions = false
      return target
    })
    setTargets(targetsResume)
  }

  const renderItem = (consultationExerciseTarget: ConsultationExerciseTarget, index: number) => {
    const props = { 
      consultationExerciseTarget, 
      index, 
      targetState: { targets, setTargets },
      concluded: consultationExercise.concluded
    }

    return <TargetListItem  {...props}/>
  }

 const headerProps = {
    headerState, 
    actions: {
      goBack,
      concludeExercise,
      showResume
    },
  }

  const getTargets = () => {
    showProgress()

    const {id, consultation_id} = consultationExercise

    getConsultationExerciseTargets(consultation_id, id)
      .then(targets => setTargets(targets))
      .finally(() => hideProgress())
  }

  const getHeaderState = () => {
    const newHeaderState = { 
      ...headerState,
      concluded: consultationExercise.concluded,
      actionBar: { 
        title: consultationExercise.exercise.program,
        subTitle: consultationExercise.exercise.getApplicationTypeDescription()
      } 
    }
    setHeaderState(newHeaderState)
  }

  const saveIfUnsaved = () => {
    if (!saved) {
      saveApplication()
    }
  }

  const refreshControl = (
    <RefreshControl
      progressBackgroundColor="#FFF"
      colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
      refreshing={false}
      onRefresh={getTargets}
    />
  )
 
  useEffect(() => {
    getHeaderState()
    getTargets()
  }, [])

  useEffect(() => navigation.addListener('beforeRemove', saveIfUnsaved))

  return (
    <View style={GlobalStyle.container}>
      <ConsultationExerciseTargetFormActionBar {...headerProps} />

      <ProgressBar
        style={styles.progressBar}
        visible={progressVisible}
        color={PRIMARY_COLOR}
        indeterminate
      />

      <FlatList
        style={styles.flatList}
        refreshControl={refreshControl}
        data={targets}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default ConsultationExerciseTargetForm
