import React, { useEffect, useState } from 'react'

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { Divider, IconButton, Modal, Portal, ProgressBar } from 'react-native-paper'

import GlobalStyle from '../../../styles/global-style'
import styles from './styles'
import { PRIMARY_COLOR, SECONDARY_COLOR, SECONDARY_TEXT_COLOR, TERCIARY_COLOR } from '../../../colors'

import ConsultationDetailActionBar from './ActionBar'
import { Consultation, ConsultationExercise } from '../../../entities/consultation'
import { HeaderState } from '../../../entities/header-state'
import { getConsultationExercises, editConsultation, deleteConsultation } from '../../../services/consultation-service'
import WarningModal from '../../../shared/components/modals/WarningModal'

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
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [progressVisible, setProgressVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [canGoBack, setCanGoBack] = useState<boolean>(false)

  const goBack = navigation.goBack

  const showProgress = () => setProgressVisible(true)
  const hideProgress = () => setProgressVisible(false)

  const showLoading = () => setLoading(true)
  const hideLoading = () => setLoading(false)

  const showModal = () => setModalVisible(true)
  const hideModal = () => setModalVisible(false)

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
          <Text style={styles.textItemProgram}>{consultationExercise.exercise.program}</Text>
          <Text style={styles.textItemApplication}>{consultationExercise.exercise.getApplicationTypeDescription()}</Text>
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

  const isAnyExerciseApplied = (): boolean => {
    return !!exercises.filter(exercise => exercise.is_applied).length
  }

  const warningModalText = 
    isAnyExerciseApplied() ?
    'O atendimento será concluído com as informações correntes. Tem certeza que deseja sair?' :
    'Os treinos não foram aplicados e o atendimento será descartado. Tem certeza que deseja sair?'

  const warningModalProps = {
    modalState: {
      modalVisible,
      modalText: warningModalText
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
        label: 'Confirmar'
      },
      btnNegative: {
        label: 'Cancelar',
        onPress: hideModal  
      },
    },
    hideModal,
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
    showLoading()

    const payload = {concluded: true}

    editConsultation(consultation.id, payload)
      .then(() => {
        setCanGoBack(true)
        hideLoading()
        goBack()
      })
      .catch(e => console.log(e))
  }

  const discardConsultation = () => {
    showProgress()

    deleteConsultation(consultation.id)
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

  useEffect(() => navigation.addListener('beforeRemove', e => {
    if (!canGoBack) {
      e.preventDefault()
      showModal()
    }
  }))

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
        refreshControl={refreshControl}
        data={exercises}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={item => item.id.toString()}
      />

      <TouchableOpacity
        style={{...GlobalStyle.btnPrimary, alignSelf: 'center', marginBottom: 16}}
        onPress={concludeConsultation}>
        {
          loading ?
            <ActivityIndicator animating={true} color={TERCIARY_COLOR} /> :
            <Text style={GlobalStyle.btnPrimaryText}>Concluir atendimento</Text>
        }
      </TouchableOpacity>

      <WarningModal {...warningModalProps} />
    </View>
  )
}

export default ConsultationDetail
