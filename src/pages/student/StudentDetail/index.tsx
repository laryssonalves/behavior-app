import React, { useCallback, useState } from 'react'

import { useFocusEffect, useRoute, RouteProp } from '@react-navigation/native'

import { BottomNavigation, Text } from 'react-native-paper'

import { useHeaderContext } from '../../../shared/contexts/header.context'

import { SECONDARY_COLOR } from '../../../colors'

const StudentDetailExercise = () => <Text>Exercise</Text>

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
      icon: 'calendar-check-outline',
    },
  ])

  const { actions } = useHeaderContext()

  const route = useRoute<RouteProp<StudentDetailParams, 'Params'>>()

  const renderScene = BottomNavigation.SceneMap({
    exercise: StudentDetailExercise,
    consultation: StudentDetailConsultation,
  })

  useFocusEffect(
    useCallback(() => {
      const { name } = route.params
      actions.setActionBarTitle(name)
    }, []),
  )

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: SECONDARY_COLOR }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default StudentDetail
