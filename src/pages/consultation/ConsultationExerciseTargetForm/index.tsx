import React, { useEffect, useState } from 'react'

import { FlatList, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import _ from 'lodash'

import GlobalStyle from '../../../styles/global-style'
import styles from './styles'

import ConsultationExerciseTargetFormActionBar from './ActionBar'
import { ConsultationExercise, ConsultationExerciseTarget } from '../../../entities/consultation'
import { HeaderState } from '../../../entities/header-state'
import TargetListItem from './TargetListItem'
import * as ConsultationService from '../../../services/consultation-service'
import { ProgressBar } from 'react-native-paper'
import { PRIMARY_COLOR } from '../../../colors'
import useConsultationExerciseStepModal from '../../../components/modals/ConsultationExerciseStep/hook'

type RouteParams = {
  Params: {
    consultationId: number
    consultationExerciseId: number
  }
}

const ConsultationExerciseTargetForm = () => {
  const { goBack, addListener } = useNavigation()
  const route = useRoute<RouteProp<RouteParams, 'Params'>>()
  const { consultationId, consultationExerciseId } = route.params

  const [consultationExercise, setConsultationExercise] = useState<ConsultationExercise>({} as ConsultationExercise)
  const [headerState, setHeaderState] = useState<any>(new HeaderState())
  const [targets, setTargets] = useState<ConsultationExerciseTarget[]>([])
  const [saved, setSaved] = useState<boolean>(false)
  const [progressVisible, setProgressVisible] = useState<boolean>(false)

  const { ConsultationExerciseStepModal, showConsultationExerciseStepModal } = useConsultationExerciseStepModal()

  const showProgress = () => setProgressVisible(true)
  const hideProgress = () => setProgressVisible(false)

  const saveApplication = (concluded?: boolean) => {
    if (_.isEqual(consultationExercise.targets, targets) && !concluded) {
      return
    }

    showProgress()

    const payload = {
      consultation_exercise: consultationExerciseId,
      concluded: concluded === undefined ? consultationExercise.concluded : concluded,
      targets,
    }

    ConsultationService.sendConsultationExerciseTargetAnswers(consultationId, payload)
      .then(() => {
        setSaved(true)
        fetchConsultationExercise()
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

  function newStep() {
    showConsultationExerciseStepModal()
  }

  const saveIfUnsaved = () => {
    if (!saved && !consultationExercise.concluded) {
      saveApplication()
    }
  }

  function onFetchConsultationExerciseResponse(consultationExercise: ConsultationExercise) {
    setConsultationExercise(consultationExercise)
    setTargets(consultationExercise.targets)
    setHeaderState((currentState: HeaderState) => ({
      ...currentState,
      concluded: consultationExercise.concluded,
      actionBar: {
        title: consultationExercise.exercise.program,
        subTitle: consultationExercise.application_type_description,
      },
    }))
  }

  function fetchConsultationExercise() {
    showProgress()

    ConsultationService.getConsultationExercise(consultationId, consultationExerciseId)
      .then(onFetchConsultationExerciseResponse)
      .finally(() => hideProgress())
  }

  useEffect(() => addListener('beforeRemove', saveIfUnsaved))

  useEffect(() => {
    fetchConsultationExercise()
  }, [consultationId, consultationExerciseId])

  const Actions = () => {
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.btnDefault} onPress={goBack}>
          <Text style={GlobalStyle.btnPrimaryText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={newStep}>
          <Text style={GlobalStyle.btnPrimaryText}>Novo passo</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ConsultationExerciseTargetFormActionBar
        {...{
          headerState,
          actions: {
            goBack,
            concludeExercise,
            showResume,
            shuffleTargets,
            unshuffleTargets,
          },
        }}
      />

      <ProgressBar style={styles.progressBar} visible={progressVisible} color={PRIMARY_COLOR} indeterminate />

      <ConsultationExerciseStepModal
        {...{
          consultationId,
          exerciseId: consultationExercise?.exercise?.id,
          applicationType: consultationExercise.application_type,
          helpType: consultationExercise.help_type,
          helpDescription: consultationExercise.help_description,
        }}
      />

      <View style={styles.body}>
        <FlatList
          style={styles.flatList}
          data={targets}
          renderItem={({ item, index }) => renderTargetListItem(item, index)}
          keyExtractor={item => item.id.toString()}
        />

        {consultationExercise.concluded && <Actions></Actions>}
      </View>
    </View>
  )
}

export default ConsultationExerciseTargetForm
