import React, { useState } from 'react'

import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Divider, Modal, Portal, Checkbox, ActivityIndicator } from 'react-native-paper'
import { PRIMARY_COLOR, TERCIARY_COLOR } from '../../../colors'
import { StudentExercise } from '../../../entities/student'
import { addConsultation } from '../../../services/consultation-service'

import GlobalStyle from '../../../styles/global-style'
import styles from './styles'

const ConsultationAdd = ({ visible, hideModal, exercises, studentId }: any) => {
  const [exerciseIds, setExerciseIds] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  const isExeciseChecked = (exerciseId: number): boolean => {
    return exerciseIds.includes(exerciseId)
  }

  const onCheckPress = (exerciseId: number) => {
    if (isExeciseChecked(exerciseId)) {
      setExerciseIds(exerciseIds.filter(id => id !== exerciseId))
    } else {
      setExerciseIds([...exerciseIds, exerciseId])
    }
  }

  const renderItem = (exercise: StudentExercise, index: number) => (
    <View>
      <TouchableOpacity onPress={() => onCheckPress(exercise.id)} style={styles.flatListItem}>
        <View style={GlobalStyle.container}>
          <Text style={styles.textItemName}>{exercise.program}</Text>
          <Text style={styles.textItemAge}>{exercise.getApplicationTypeDescription()}</Text>
        </View>
        <Checkbox
          color={PRIMARY_COLOR}
          status={isExeciseChecked(exercise.id) ? 'checked' : 'unchecked'}
          onPress={() => onCheckPress(exercise.id)}
        />
      </TouchableOpacity>
      {index !== exercises.length - 1 && <Divider style={styles.dividerItem} />}
    </View>
  )

  const closeModal = () => {
    setExerciseIds([])
    setLoading(false)
    hideModal()
  }

  const isAllExercisesChecked = () => {
    return (exerciseIds.length || exercises.length) && (exerciseIds.length === exercises.length)
  }

  const setAllExercisesChecked = () => {
    if (!isAllExercisesChecked()) {
      const checkedExercises: number[] = []
      exercises.forEach((exercise: StudentExercise) => checkedExercises.push(exercise.id))
      setExerciseIds(checkedExercises)
    } else {
      setExerciseIds([])
    }
  }

  const submitForm = async () => {
    try {
      setLoading(true)

      const payload = {
        student: studentId,
        exercise_ids: exerciseIds,
      }

      const consultation = await addConsultation(payload)
      
      closeModal()
      
      navigation.navigate('ConsultationDetail', { consultation: consultation.toJson() })
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={loading}
        onDismiss={closeModal}
        contentContainerStyle={{...GlobalStyle.modalContainer, margin: 16}}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={{...GlobalStyle.modalTitle, flex: 1}}>Selecionar treinos</Text>
            <Checkbox
              color={PRIMARY_COLOR}
              status={isAllExercisesChecked() ? 'checked' : 'unchecked'}
              onPress={() => setAllExercisesChecked()}
            />
          </View>    
          <View style={{...GlobalStyle.modalBody, paddingHorizontal: 0, paddingTop: 0, maxHeight: '85%'}}>
            <FlatList
              data={exercises}
              renderItem={({ item, index }) => renderItem(item, index)}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          <View style={GlobalStyle.modalFooter}>
            <TouchableOpacity
              style={styles.btnDefault}
              onPress={closeModal}
              disabled={loading}>
              <Text style={GlobalStyle.btnPrimaryText}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={submitForm}
              disabled={loading || !exerciseIds.length}>
              {
                loading ?
                  <ActivityIndicator animating={true} color={TERCIARY_COLOR} /> :
                  <Text style={GlobalStyle.btnPrimaryText}>INICIAR</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  )
}

export default ConsultationAdd
