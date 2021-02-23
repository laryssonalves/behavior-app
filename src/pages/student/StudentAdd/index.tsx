import React, { useMemo, useState } from 'react'

import moment from 'moment'

import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Modal, Portal } from 'react-native-paper'

import RNPickerSelect from 'react-native-picker-select'

import StudentService from '../../../services/student-service'

import { SECONDARY_COLOR, TERCIARY_COLOR } from '../../../colors'

import { genreChoiceList } from '../../../models/choice.model'

import * as SecureStorage from '../../../services/secure-storage'

import Company from '../../../models/company.model'

import { Student } from '../../../models/student'

import GlobalStyle from '../../../global-style'

import styles from './styles'

const StudentAdd = ({ visible, hideModal }: any) => {
  const [student, setStudent] = useState<Student>({} as Student)
  const [loading, setLoading] = useState<boolean>(false)
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  const studentService = StudentService.getInstance()
  const genreChoices = genreChoiceList().map(genre => ({ label: genre.name, value: genre.value }))

  const onClickSave = async () => {
    try {
      setLoading(true)

      const storagedCompany = await SecureStorage.retrieveItem('company') as Company

      const studentToSave = Student.createFromJSON({ ...student, company: storagedCompany.id })

      await studentService.addStudent(studentToSave)

      closeModal()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const resetState = () => {
    setStudent({} as Student)
    setLoading(false)
  }

  const closeModal = () => {
    resetState()
    hideModal()
  }

  const openDatePicker = () => setDatePickerVisible(true)
  const closeDatePicker = () => setDatePickerVisible(false)

  const updateStudent = (data: any) => {
    setStudent({ ...student, ...data })
  }

  const onBirthPickerChange = (selectedDate?: Date) => {
    closeDatePicker()

    const currentDate = selectedDate || student.birth_date ? moment(selectedDate || student.birth_date) : null

    updateStudent({ birth_date: currentDate })
  }

  const datePicker = () => {
    return datePickerVisible &&
      <DateTimePickerModal
        isVisible={datePickerVisible}
        maximumDate={new Date()}
        date={student.birth_date ? student.birth_date.toDate() : new Date()}
        mode="date"
        onConfirm={onBirthPickerChange}
        onCancel={closeDatePicker}
      />
  }

  const MemoizedDatePicker = useMemo(datePicker, [datePickerVisible])

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={closeModal}
        contentContainerStyle={GlobalStyle.modalContainer}>
        <Text style={GlobalStyle.modalTitle}>Adicionar estudante</Text>
        <View style={GlobalStyle.modalBody}>
          <View style={styles.inputView}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
              pickerProps={{ mode: 'dropdown', style: pickerStyle.inputAndroid }}
              placeholder={{ label: 'Gênero', value: null }}
              onValueChange={genre => updateStudent({ genre })}
              items={genreChoices}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={GlobalStyle.inputText}
              placeholder="Nome"
              placeholderTextColor={SECONDARY_COLOR}
              onChangeText={name => updateStudent({ name })} />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={GlobalStyle.inputText}
              placeholder="Gênero"
              placeholderTextColor={SECONDARY_COLOR}
              onChangeText={genre => updateStudent({ genre })} />
          </View>
          <TouchableOpacity style={styles.inputView} onPress={openDatePicker}>
            <Text style={styles.datePickerText}>
              {student.birth_date ? student.birth_date.format('DD/MM/YYYY') : 'Data Nascimento'}
            </Text>
            {MemoizedDatePicker}
          </TouchableOpacity>
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
            onPress={onClickSave}
            disabled={loading}>
            {
              loading ?
                <ActivityIndicator animating={true} color={TERCIARY_COLOR} /> :
                <Text style={GlobalStyle.btnPrimaryText}>SALVAR</Text>
            }
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  )
}

export default StudentAdd

const pickerStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: SECONDARY_COLOR,
    fontFamily: 'Chai-Regular'
  },
  placeholder: {
    color: SECONDARY_COLOR,
  },
  inputAndroid: {
    fontSize: 16,
    color: SECONDARY_COLOR,
    fontFamily: 'Chai-Regular',
  },

  inputAndroidContainer: {
    backgroundColor: '#000'
  }
})