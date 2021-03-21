import React, { useCallback, useEffect, useState } from 'react'

import { View } from 'react-native'

import { useFocusEffect, useRoute, RouteProp } from '@react-navigation/native'

import { BottomNavigation, ProgressBar, Text } from 'react-native-paper'

import { useHeaderContext } from '../../../shared/contexts/header.context'

import { getStudentExercises } from '../../../services/student-exercise-service'

import { StudentExercise } from '../../../entities/student'

import StudentDetailExercise from './StudentDetailExercise'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'

import GlobalStyle from '../../../styles/global-style'

const StudentDetailConsultation = () => <Text>Albums</Text>

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

  const [studentExercises, setStudentExercises] = useState<StudentExercise[]>(
    []
  )

  const [progressVisible, setProgressVisible] = useState(false)

  const { actions } = useHeaderContext()

  const route = useRoute<RouteProp<StudentDetailParams, 'Params'>>()

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'exercise':
        return <StudentDetailExercise exercises={studentExercises} />
      case 'consultation':
        return <StudentDetailConsultation />
    }
  }

  useFocusEffect(
    useCallback(() => {
      const { name } = route.params
      actions.setActionBarTitle(name)
    }, [])
  )

  useEffect(() => {
    ;(async () => {
      setProgressVisible(true)
      const { id } = route.params
      const studentExercises = await getStudentExercises(id)
      setStudentExercises(studentExercises)
      setProgressVisible(false)
    })()
  }, [])

  return (
    <View style={GlobalStyle.container}>
      <ProgressBar
        style={GlobalStyle.progressBar}
        visible={progressVisible}
        color={PRIMARY_COLOR}
        indeterminate
      />
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
