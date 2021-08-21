import React, { useEffect, useState } from "react"

import { TouchableOpacity, View, Text, FlatList, RefreshControl } from "react-native"

import { FontAwesome5 } from '@expo/vector-icons';

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { Divider, ProgressBar } from "react-native-paper"

import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../colors"
import { Consultation, ConsultationExercise } from "../../../entities/consultation"
import { HeaderState } from "../../../entities/header-state"
import { getConsultationExercises } from "../../../services/consultation-service"
import GlobalStyle from "../../../styles/global-style"
import ConsultationViewActionBar from "./ActionBar"
import styles from "./styles"
import { ResultTypeChoice } from "../../../entities/choices";

type ConsultationViewParams = {
  Params: {
    consultation: string
  }
}

const ExerciseItem = ({consultationExercise}: any) => {
  const [targetsVisible, setTargetsVisible] = useState(false)

  const toggleTargets = () => setTargetsVisible(!targetsVisible)

  return (
  <View>
    <TouchableOpacity
      onPress={toggleTargets}
      disabled={!consultationExercise.is_applied}
      style={styles.flatListItem}>
      <View style={{flexBasis: "80%"}}>
        <Text style={styles.textItemProgram}>{consultationExercise.exercise.program}</Text>
        <Text style={styles.textItemApplication}>{consultationExercise.exercise.getApplicationTypeDescription()}</Text>
      </View>
      <View style={{flexBasis: "20%", justifyContent: "space-between"}}>
        {
          !consultationExercise.is_applied ?
          <Text style={styles.textItemApplication}>Não aplicado</Text>
          :
          <View style={{justifyContent: "space-between", flex: 1}}>
            <View style={{justifyContent: "space-between", flexDirection: "row"}}>
              <FontAwesome5 name="check" color="green" />
              <FontAwesome5 name="check-circle" color="blue" />
              <FontAwesome5 name="times" color="red" />
            </View>
            <View style={{justifyContent: "space-between", flexDirection: "row"}}>
              <Text style={styles.textItemApplication}>{consultationExercise.result.result_indepent}</Text>
              <Text style={styles.textItemApplication}>{consultationExercise.result.result_correct_with_help}</Text>
              <Text style={styles.textItemApplication}>{consultationExercise.result.result_wrong}</Text>
            </View>
          </View>
        }
      </View>
    </TouchableOpacity>
    {
      targetsVisible &&
      <View style={styles.subFlatList}>
        <Text style={styles.titleSubFlatList}>Resultados por alvo</Text>
        <FlatList
          data={consultationExercise.targets}
          renderItem={({ item, index }) => {
            return (
              <View style={{flexDirection: "row"}}> 
                <View style={{flex: 1, flexBasis: "80%"}}>
                  <Text style={styles.textItemApplication}>{item.student_target.target}</Text>
                </View>
                <View style={{ flex: 1, flexBasis: "20%", justifyContent: "space-between"}}>
                  <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                    <Text style={styles.textItemApplication}>{item.checkResult(ResultTypeChoice.INDEPENDENT) ? 1 : 0}</Text>
                    <Text style={styles.textItemApplication}>{item.checkResult(ResultTypeChoice.CORRECT_WITH_HELP) ? 1 : 0}</Text>
                    <Text style={styles.textItemApplication}>{item.checkResult(ResultTypeChoice.WRONG) ? 1 : 0}</Text>
                  </View>
                </View>
              </View>
            )
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    }
  </View>
)}


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
      goBack: navigation.goBack
    },
  }


  const getExercises = () => {
    showProgress()
    
    getConsultationExercises(consultation.id)
      .then(exercises => setExercises(exercises))
      .finally(() => hideProgress())
  }

  const getHeaderState = () => {
    const newHeaderState = { 
      ...headerState, 
      actionBar: { 
        title: 'Detalhes do atendimento',
        subTitle: `${consultation?.student.name} - Terapeuta: ${consultation?.owner.name}`
      } 
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

  const isLastIndex = (index: number) => {
    return index === (exercises.length - 1)
  }

  useEffect(initComponent, [])

  return (
    <View style={GlobalStyle.container}>
      <ConsultationViewActionBar {...headerProps}/>

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
        renderItem={({item, index}) => <ExerciseItem {...{consultationExercise: item}}/>}
        keyExtractor={item => item.id.toString()}
      />

    </View>
  )
}

export default ConsultationResume