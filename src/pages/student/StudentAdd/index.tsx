import { Modal, Portal } from 'react-native-paper'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { SECONDARY_COLOR, TERCIARY_COLOR } from '../../../colors'
import React, { useState } from 'react'
import GlobalStyle from '../../../global-style'
import StudentService from '../../../services/student-service'


const StudentAdd = ({ visible, hideModal }: any) => {
  const [ student, setStudent ] = useState<Student>({} as Student)
  const [ loading, setLoading ] = useState<boolean>(false)

  const studentService = StudentService.getInstance()

  const onClickSave = async () => {
    try {
      setLoading(true)

      const studentSaved = await studentService.addStudent(student)

      setStudent(studentSaved)
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

  const updateStudent = (data: any) => {
    setStudent((state) => { return { ...state, ...data } })
    console.log(student)
  }

  return (
    <Portal>
      <Modal
        visible={ visible }
        onDismiss={ closeModal }
        contentContainerStyle={ GlobalStyle.modalContainer }>
        <Text style={ GlobalStyle.modalTitle }>Adicionar estudante</Text>
        <View style={ GlobalStyle.modalBody }>
          <View style={ styles.inputView }>
            <TextInput
              style={ GlobalStyle.inputText }
              placeholder="Nome"
              placeholderTextColor={ SECONDARY_COLOR }
              onChangeText={ name => updateStudent({ name }) }/>
          </View>
          <View style={ styles.inputView }>
            <TextInput
              style={ GlobalStyle.inputText }
              placeholder="Gênero"
              placeholderTextColor={ SECONDARY_COLOR }
              onChangeText={ genre => updateStudent({ genre }) }/>
          </View>
          <View style={ styles.inputView }>
            <TextInput
              style={ GlobalStyle.inputText }
              placeholder="Data Nascimento"
              placeholderTextColor={ SECONDARY_COLOR }
              onChangeText={ birth_date => updateStudent({ birth_date }) }/>
          </View>
        </View>
        <View style={ {
          ...GlobalStyle.modalFooter,
          justifyContent: 'space-between'

        } }>
          <TouchableOpacity
            style={ {
              // borderWidth: 0.2,
              borderRadius: 24,
              height: 48,
              // flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EFEFEF',
              width: '50%'
            } }
            onPress={ hideModal }
            disabled={ loading }>
            <Text style={ GlobalStyle.btnPrimaryText }>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ {
              ...GlobalStyle.btnPrimary,
              width: '50%'
              // flex: 1
            } }
            onPress={ onClickSave }
            disabled={ loading }>
            {
              loading ?
                <ActivityIndicator animating={ true } color={ TERCIARY_COLOR }/> :
                <Text style={ GlobalStyle.btnPrimaryText }>SALVAR</Text>
            }
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  )
}

export default StudentAdd