import React, { useEffect, useState } from 'react'

import { FlatList, View } from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import GlobalStyle from '../../../styles/global-style'
import styles from './styles'

import ConsultationExerciseTargetFormActionBar from './ActionBar'
import { ConsultationExerciseTarget } from '../../../entities/consultation'
import { HeaderState } from '../../../entities/header-state'
import TargetListItem from './TargetListItem'
import { sendConsultationExerciseTargetAnswers, getConsultationExerciseTargets } from '../../../services/consultation-service'

type ConsultationExerciseTargetFormParams = {
  Params: {
    consultationId: number,
    consultationExerciseId: number,
    program: string,
    applicationTypeDescription: string
  }
}

const ConsultationExerciseTargetForm = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ConsultationExerciseTargetFormParams, 'Params'>>()
  const { consultationId, consultationExerciseId, program, applicationTypeDescription } = route.params
  
  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())
  const [targets, setTargets] = useState<ConsultationExerciseTarget[]>([])

  const finishApplication = async () => {
    try {
      console.log(targets)
      await sendConsultationExerciseTargetAnswers(consultationId, { targets })
    } catch (e) {
      console.log(e)
    }
  }

  const showResume = () => {
    const targetsResume = targets.map(target => {
      target.showOptions = false
      return target
    })
    setTargets(targetsResume)
  }

  const renderItem = (consultationExerciseTarget: ConsultationExerciseTarget, index: number) => {
    const props = { consultationExerciseTarget, index, targetState: { targets, setTargets }}
    return <TargetListItem  {...props}/>
  }

 const headerProps = {
    headerState, 
    actions: {
      goBack: navigation.goBack,
      finishApplication,
      showResume
    },
  }

  const getTargets = async () => {
    const targets = await getConsultationExerciseTargets(consultationId, consultationExerciseId)
    setTargets(targets)
  }

  const getHeaderState = () => {
    const newHeaderState = { 
      ...headerState, 
      actionBar: { 
        title: program,
        subTitle: applicationTypeDescription
      } 
    }
    setHeaderState(newHeaderState)
  }
 
  useEffect(() => {
    getHeaderState()
    getTargets()
  }, [])

  return (
      <View style={GlobalStyle.container}>
        <ConsultationExerciseTargetFormActionBar {...headerProps} />

        <FlatList
          style={styles.flatList}
          data={targets}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
  )
}

export default ConsultationExerciseTargetForm
