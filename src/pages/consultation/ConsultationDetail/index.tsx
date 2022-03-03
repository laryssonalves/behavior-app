import React, { useEffect, useState } from 'react'

import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { Divider, IconButton, ProgressBar } from 'react-native-paper'

import GlobalStyle from '../../../styles/global-style'
import styles from './styles'
import { PRIMARY_COLOR, SECONDARY_COLOR, SECONDARY_TEXT_COLOR, TERCIARY_COLOR } from '../../../colors'

import ConsultationDetailActionBar from './ActionBar'
import { Consultation, ConsultationExercise } from '../../../entities/consultation'
import { HeaderState } from '../../../entities/header-state'
import * as ConsultationService from '../../../services/consultation-service'
import WarningModal from '../../../shared/components/modals/WarningModal'
import { isLastIndex } from '../../../utils'

type ConsultationDetailParams = {
  Params: {
    consultation: string
  }
}

const ConsultationDetail = () => {
  const { goBack, navigate, ...navigation } = useNavigation()
  const route = useRoute<RouteProp<ConsultationDetailParams, 'Params'>>()
  const consultation = Consultation.fromJson(route.params.consultation)

  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())
  const [exercises, setExercises] = useState<ConsultationExercise[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [progressVisible, setProgressVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [canGoBack, setCanGoBack] = useState<boolean>(false)

  const showProgress = () => setProgressVisible(true)
  const hideProgress = () => setProgressVisible(false)

  const showLoading = () => setLoading(true)
  const hideLoading = () => setLoading(false)

  const showModal = () => setModalVisible(true)
  const hideModal = () => setModalVisible(false)

  const goToConsultationExerciseList = ({ consultation_id, id }: ConsultationExercise) => {
    navigate('ConsultationExerciseTargetForm', { consultationId: consultation_id, consultationExerciseId: id })
  }

  const renderItem = (consultationExercise: ConsultationExercise, index: number) => (
    <View>
      <TouchableOpacity onPress={() => goToConsultationExerciseList(consultationExercise)} style={styles.flatListItem}>
        <View style={GlobalStyle.container}>
          <Text style={styles.textItemProgram}>{consultationExercise.exercise.program}</Text>
          <Text style={styles.textItemApplication}>{consultationExercise.application_type_description}</Text>
        </View>
        {consultationExercise.concluded && <IconButton icon="lock" color={SECONDARY_TEXT_COLOR} size={20} />}
      </TouchableOpacity>
      {!isLastIndex(index, exercises) && <Divider style={styles.dividerItem} />}
    </View>
  )

  const headerProps = {
    headerState,
    actions: {
      goBack,
    },
  }

  const isAnyExerciseApplied = (): boolean => {
    return !!exercises.filter(exercise => exercise.is_applied).length
  }

  const warningModalText = isAnyExerciseApplied()
    ? 'O atendimento será concluído com as informações correntes. Tem certeza que deseja sair?'
    : 'Os programas não foram aplicados e o atendimento será descartado. Tem certeza que deseja sair?'

  const warningModalProps = {
    modalState: {
      modalVisible,
      modalText: warningModalText,
    },
    btnStates: {
      btnPositive: {
        loading,
        onPress: () => {
          hideModal()

          if (isAnyExerciseApplied()) {
            concludeConsultation()
          } else {
            discardConsultation()
          }
        },
        label: 'Confirmar',
      },
      btnNegative: {
        label: 'Cancelar',
        onPress: hideModal,
      },
    },
    hideModal,
  }

  const getHeaderState = () => {
    const newHeaderState = {
      ...headerState,
      actionBar: {
        title: consultation.student.name,
        subTitle: `Terapeuta: ${consultation.owner.name}`,
      },
    }
    setHeaderState(newHeaderState)
  }

  const getExercises = () => {
    showProgress()

    ConsultationService.getConsultationExercises(consultation.id)
      .then(data => setExercises(data))
      .finally(() => hideProgress())
  }

  const concludeConsultation = () => {
    showLoading()

    const payload = { concluded: true }

    ConsultationService.editConsultation(consultation.id, payload)
      .then(() => {
        setCanGoBack(true)
        hideLoading()
        goBack()
      })
      .catch(e => console.log(e))
  }

  const discardConsultation = () => {
    showProgress()

    ConsultationService.deleteConsultation(consultation.id)
      .then(() => {
        setCanGoBack(true)
        hideProgress()
        goBack()
      })
      .catch(e => console.log(e))
  }

  const refreshControl = (
    <RefreshControl
      progressBackgroundColor="#FFF"
      colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
      refreshing={false}
      onRefresh={getExercises}
    />
  )

  useEffect(getHeaderState, [])

  useEffect(() => navigation.addListener('focus', getExercises))

  useEffect(() =>
    navigation.addListener('beforeRemove', e => {
      if (!canGoBack) {
        e.preventDefault()
        showModal()
      }
    })
  )

  return (
    <View style={GlobalStyle.container}>
      <ConsultationDetailActionBar {...headerProps} />

      <ProgressBar style={styles.progressBar} visible={progressVisible} color={PRIMARY_COLOR} indeterminate />

      <FlatList
        style={styles.flatList}
        refreshControl={refreshControl}
        data={exercises}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={item => item.id.toString()}
      />

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={concludeConsultation}>
        {loading ? (
          <ActivityIndicator animating={true} color={TERCIARY_COLOR} />
        ) : (
          <Text style={GlobalStyle.btnPrimaryText}>Concluir atendimento</Text>
        )}
      </TouchableOpacity>

      <WarningModal {...warningModalProps} />
    </View>
  )
}

export default ConsultationDetail
