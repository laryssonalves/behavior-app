import React, { useEffect, useState } from 'react'

import { View } from 'react-native'

import { useRoute, RouteProp } from '@react-navigation/native'

import { BottomNavigation, ProgressBar } from 'react-native-paper'

import { getStudentExercises } from '../../../services/student-exercise-service'
import { getConsultations } from '../../../services/consultation-service'

import { Consultation } from '../../../entities/consultation'
import { StudentExercise } from '../../../entities/student'

import ExcerciseList from './ExerciseList'
import ConsultationList from './ConsultationList'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'

import GlobalStyle from '../../../styles/global-style'
import StudentDetailActionBar from './ActionBar'


type StudentDetailParams = {
  Params: {
    id: number
    name: string
  }
}

const StudentDetail = () => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'exercise', title: 'Treinos', icon: 'format-list-checks' },
    {
      key: 'consultation',
      title: 'Atendimentos',
      icon: 'calendar-check-outline'
    }
  ])

  const [studentExercises, setStudentExercises] = useState<StudentExercise[]>([])
  const [consultations, setConsultations] = useState<Consultation[]>([])

  const [progressVisible, setProgressVisible] = useState(false)

  const route = useRoute<RouteProp<StudentDetailParams, 'Params'>>()

  const fetchStudentExercises = async () => {
    try {
      setProgressVisible(true)
      const { id } = route.params
      const studentExercises = await getStudentExercises(id)
      setStudentExercises(studentExercises)
    } catch (e) {
    } finally {
      setProgressVisible(false)
    }
  }

  const fetchConsultations = async () => {
    try {
      setProgressVisible(true)
      const { id } = route.params
      const consultations = await getConsultations(id)
      setConsultations(consultations)
    } catch (e) {
    } finally {
      setProgressVisible(false)
    }
  }

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'exercise':
        return <ExcerciseList exercises={studentExercises} refreshList={fetchStudentExercises} />
      case 'consultation':
        return <ConsultationList consultations={consultations} refreshList={fetchConsultations} />
    }
  }

  useEffect(() => {
    ;(async () => {
      fetchStudentExercises()
      fetchConsultations()
    })()
  }, [])

  return (
    <View style={GlobalStyle.container}>
      <StudentDetailActionBar title={route.params.name} />
      <ProgressBar style={GlobalStyle.progressBar} visible={progressVisible} color={PRIMARY_COLOR} indeterminate />
      <BottomNavigation
        barStyle={{ backgroundColor: SECONDARY_COLOR }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
  )
}

export default StudentDetail
