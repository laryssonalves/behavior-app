import React, { useState } from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import { SECONDARY_COLOR } from '../../../colors'
import { applicationTypeChoiceList, applicationTypeHasHelpType, helpTypeChoiceList } from '../../../entities/choices'
import BaseModal from '../../../shared/components/modals/BaseModal'
import { pickerStyleInvalid, pickerStyleValid } from '../../../styles/datepicker-style'
import GlobalStyle from '../../../styles/global-style'
import { ConsultationExerciseDataType, ConsultationExerciseStepState, useConsultationExerciseStep } from './context'
import styles from './styles'

type Props = {
  modalProps: {
    visible: boolean
    hide: () => void
  }
  consultationExerciseData: ConsultationExerciseDataType
}

const applicationTypeChoices = applicationTypeChoiceList().map(app => ({ label: app.name, value: app.value }))
const helpTypeChoices = helpTypeChoiceList().map(help => ({ label: help.name, value: help.value }))

export default ({ modalProps, consultationExerciseData }: Props) => {
  const { state, actions } = useConsultationExerciseStep()

  function updateValues(values: Partial<ConsultationExerciseStepState>) {
    actions.setContextState(values)
  }

  useEffect(() => {
    updateValues(consultationExerciseData)
  }, [])

  return (
    <BaseModal
      dismissable={!state.isLoading}
      visible={modalProps.visible}
      title="Novo passo"
      body={
        <View> 
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={state.isSubmitted && !state.applicationType ? pickerStyleInvalid : pickerStyleValid}
            value={state.applicationType || null}
            pickerProps={{ mode: 'dropdown' }}
            placeholder={{ label: 'Etapa de aplicação', value: null }}
            onValueChange={applicationType => updateValues({ applicationType })}
            items={applicationTypeChoices}
          />
          {applicationTypeHasHelpType(state.applicationType) && (
            <>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={state.isSubmitted && !state.helpType ? pickerStyleInvalid : pickerStyleValid}
                value={state.helpType || null}
                pickerProps={{ mode: 'dialog' }}
                placeholder={{ label: 'Tipo de ajuda', value: null }}
                onValueChange={helpType => updateValues({ helpType })}
                items={helpTypeChoices}
              />
              <View style={styles.inputView}>
                <TextInput
                  style={GlobalStyle.inputText}
                  placeholder="Observações de ajuda"
                  value={state.helpDescription || ''}
                  autoCapitalize="sentences"
                  placeholderTextColor={SECONDARY_COLOR}
                  onChangeText={helpDescription => updateValues({ helpDescription })}
                />
              </View>
            </>
          )}
        </View>
      }
      onDismiss={modalProps.hide}
      buttons={{
        negative: {
          label: 'Cancelar',
          onPress: modalProps.hide,
        },
        positive: {
          label: 'Salvar',
          onPress: async () => await actions.save(modalProps.hide),
          loading: state.isLoading,
        },
      }}
    />
  )
}
