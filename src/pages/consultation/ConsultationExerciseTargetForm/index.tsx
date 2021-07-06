import React, { useEffect, useState } from 'react'

import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { Colors, Divider, IconButton, ProgressBar } from 'react-native-paper'

import GlobalStyle from '../../../styles/global-style'
import styles from './styles'
import { PRIMARY_COLOR, SECONDARY_COLOR, SECONDARY_TEXT_COLOR } from '../../../colors'

import ConsultationExerciseTargetFormActionBar from './ActionBar'
import { ConsultationExercise, ConsultationExerciseTarget } from '../../../entities/consultation'
import { HeaderState } from '../../../entities/header-state'
import { ResultTypeChoice, resultTypeChoiceList } from '../../../entities/choices'

type ConsultationExerciseTargetFormParams = {
  Params: {
    consultationExercise: string
  }
}

const ConsultationExerciseTargetForm = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ConsultationExerciseTargetFormParams, 'Params'>>()
  
  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())
  const [targets, setTargets] = useState<ConsultationExerciseTarget[]>([])

  const renderItem = (consultationExerciseTarget: ConsultationExerciseTarget, index: number) => {
    const setShowOptions = (showOptions: boolean) => {
      const newTarget = new ConsultationExerciseTarget({ 
        ...consultationExerciseTarget, showOptions
      })
      setNewTarget(newTarget)
    }

    const setResultType = (resultType: ResultTypeChoice) => {
      const newTarget = new ConsultationExerciseTarget({ 
        ...consultationExerciseTarget, result_type: resultType, showOptions: false
      })
      setNewTarget(newTarget)
    }

    const setNewTarget = (target: ConsultationExerciseTarget) => {
      const newTargets = [...targets]
      newTargets[index] = target
      setTargets(newTargets)
    }

    const getResultTypeIconColor = (result_type: ResultTypeChoice): string => { 
      switch (consultationExerciseTarget.result_type) {
        case ResultTypeChoice.WRONG:
          return Colors.red500
        case ResultTypeChoice.CORRECT_WITH_HELP:
          return Colors.blue500
        case ResultTypeChoice.INDEPENDENT:
            return Colors.green500
        default:
          return ''
      }
    }

    const getResultTypeIcon = (result_type: ResultTypeChoice): string => { 
      switch (consultationExerciseTarget.result_type) {
        case ResultTypeChoice.WRONG:
          return 'close'
        case ResultTypeChoice.CORRECT_WITH_HELP:
          return 'check-circle'
        case ResultTypeChoice.INDEPENDENT:
            return 'check'
        default:
          return ''
      }
    }

    return (
      <View style={styles.flatListItem}>
        
        {
          consultationExerciseTarget.showOptions ?
          (<>
            <Text style={styles.textItemName}>{consultationExerciseTarget.student_target.target}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}> 
              <IconButton 
                icon="check-circle"
                size={35}
                color={SECONDARY_TEXT_COLOR}
                onPress={() => { setResultType(ResultTypeChoice.CORRECT_WITH_HELP) }}
              />
              <IconButton 
                icon="check"
                size={35}
                color={SECONDARY_TEXT_COLOR}
                onPress={() => { setResultType(ResultTypeChoice.INDEPENDENT) }}
              />
              <IconButton 
                icon="close"
                size={35}
                color={SECONDARY_TEXT_COLOR}
                onPress={() => { setResultType(ResultTypeChoice.WRONG) }}
              />
            </View>
            </>
          )
          :
          (
            <TouchableOpacity 
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                if (!consultationExerciseTarget.isNotApplied()) {
                  setShowOptions(true)
                }
              }}>
              <Text style={{...styles.textItemName, flex: 1}}>{consultationExerciseTarget.student_target.target}</Text>
              <IconButton 
                icon={getResultTypeIcon(consultationExerciseTarget.result_type)}
                size={20}
                color={getResultTypeIconColor(consultationExerciseTarget.result_type)}
              />
            </TouchableOpacity>
          )
        }
        {index !== targets.length - 1 && ( <Divider style={styles.dividerItem} /> ) }
      </View>
    )
  }

  const headerProps = {
    headerState, 
    actions: {
      goBack: navigation.goBack
    },
  }

  useEffect(() => {
    const consultationExercise = ConsultationExercise.fromJson(route.params.consultationExercise)
    const newHeaderState = { 
      ...headerState, 
      actionBar: { 
        title: consultationExercise.exercise.program,
        subTitle: consultationExercise.exercise.getApplicationTypeDescription() 
      } 
    }
    setHeaderState(newHeaderState)
    setTargets(consultationExercise.targets)
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
