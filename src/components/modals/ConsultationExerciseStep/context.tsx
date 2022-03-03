import React, { ReactNode, createContext, useContext, useState } from 'react'
import _ from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { ApplicationTypeChoice, HelpTypeChoice } from '../../../entities/choices'
import * as ConsultationService from '../../../services/consultation-service'

type Props = {
  children: ReactNode
}

interface ConsultationExerciseDataType {
  consultationId: number
  exerciseId: number
  applicationType: ApplicationTypeChoice
  helpType?: HelpTypeChoice
  helpDescription?: string
}

interface ConsultationExerciseStepState extends ConsultationExerciseDataType {
  isSubmitted: boolean
  isLoading: boolean
}

interface ConsultationExerciseStepData {
  state: ConsultationExerciseStepState
  actions: {
    save: (hide: any) => Promise<void>
    setContextState: (state: Partial<ConsultationExerciseStepState>) => void
  }
}

const ConsultationExerciseStepContext = createContext<ConsultationExerciseStepData>({} as ConsultationExerciseStepData)

const ConsultationExerciseStepProvider = ({ children }: Props) => {
  const [state, setState] = useState<ConsultationExerciseStepState>({
    isLoading: false,
    isSubmitted: false,
  } as ConsultationExerciseStepState)

  const navigation = useNavigation()

  function setContextState(state: Partial<ConsultationExerciseStepState>) {
    setState(currentState => ({ ...currentState, ...state }))
  }

  async function save(hide: any) {
    try {
      setState(currentState => ({ ...currentState, isLoading: true, isSubmitted: true }))

      const { consultationId, isLoading, isSubmitted, ...rest } = state
      const payload = _.mapKeys(rest, (value, key) => _.snakeCase(key))
      const { id, consultation_id } = await ConsultationService.addConsultationExercise(consultationId, payload)

      setState(currentState => ({ ...currentState, isLoading: false, isSubmitted: false }))

      hide()
      navigation.setParams({ consultationId: consultation_id, consultationExerciseId: id})
    } catch (error) {
      console.log(error)
      setState(currentState => ({ ...currentState, isLoading: false, isSubmitted: true }))
    }
  }

  return (
    <ConsultationExerciseStepContext.Provider
      value={{
        state,
        actions: {
          save,
          setContextState,
        },
      }}>
      {children}
    </ConsultationExerciseStepContext.Provider>
  )
}

const useConsultationExerciseStep = () => {
  const context = useContext(ConsultationExerciseStepContext)

  if (!context) {
    throw new Error('useConsultationExerciseStep must be used within an ConsultationExerciseStepProvider.')
  }

  return context
}

export { ConsultationExerciseStepProvider, useConsultationExerciseStep, ConsultationExerciseDataType, ConsultationExerciseStepState }
