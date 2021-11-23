import React, { useEffect, useState } from 'react'

import { FlatList, RefreshControl, View } from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import _ from 'lodash'

import GlobalStyle from '../../../styles/global-style'
import styles from './styles'

import ConsultationExerciseTargetFormActionBar from './ActionBar'
import { ConsultationExercise, ConsultationExerciseTarget } from '../../../entities/consultation'
import { HeaderState } from '../../../entities/header-state'
import TargetListItem from './TargetListItem'
import {
  sendConsultationExerciseTargetAnswers,
  getConsultationExerciseTargets,
} from '../../../services/consultation-service'
import { ProgressBar } from 'react-native-paper'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'

type ConsultationExerciseTargetFormParams = {
  Params: {
    consultationExercise: string
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

    const { id, consultation_id } = consultationExercise

    const payload = {
      consultation_exercise: id,
      concluded: concluded === undefined ? consultationExercise.concluded : concluded,
      targets,
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
    const targetsResume = getTargetsHidden()
    setTargets(targetsResume)
  }

  const getTargetsHidden = (): ConsultationExerciseTarget[] =>
    targets.map(target => Object.assign(target, { showOptions: false }))

  const shuffleTargets = () => {
    const numberOfTries = targets.length / consultationExercise.exercise.total_targets
    const numberOfTargets = targets.length / numberOfTries

    const shuffledTargets = []
    const targetsArrAux = _.sortBy(getTargetsHidden(), 'id')

    for (let i = 0; i < numberOfTries; i++) {
      const arr = targetsArrAux.splice(0, numberOfTargets)
      const arrShuffled = _.shuffle(arr).map((value, index) => ({ ...value, application_sequence: index + 1 }))
      shuffledTargets.push(arrShuffled)
    }

    setTargets(shuffledTargets.flat() as ConsultationExerciseTarget[])
  }

  const unshuffleTargets = () => {
    const targetsUnshuffled = getTargetsHidden().map(value => ({ ...value, application_sequence: value.sequence }))
    setTargets(_.sortBy(targetsUnshuffled, 'id') as ConsultationExerciseTarget[])
  }

  const renderTargetListItem = (consultationExerciseTarget: ConsultationExerciseTarget, index: number) => {
    const props = {
      consultationExerciseTarget,
      index,
      targetState: { targets, setTargets },
      concluded: consultationExercise.concluded,
      exerciseTargetsTotal: consultationExercise.exercise.total_targets,
    }

    return <TargetListItem {...props} />
  }

  const headerProps = {
    headerState,
    actions: {
      goBack,
      concludeExercise,
      showResume,
      shuffleTargets,
      unshuffleTargets,
    },
  }

  const getTargets = () => {
    showProgress()

    const { id, consultation_id } = consultationExercise

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
        subTitle: consultationExercise.exercise.getApplicationTypeDescription(),
      },
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

      <ProgressBar style={styles.progressBar} visible={progressVisible} color={PRIMARY_COLOR} indeterminate />

      <FlatList
        style={styles.flatList}
        refreshControl={refreshControl}
        data={targets}
        renderItem={({ item, index }) => renderTargetListItem(item, index)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default ConsultationExerciseTargetForm
