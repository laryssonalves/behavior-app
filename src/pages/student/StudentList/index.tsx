import React, { useEffect, useState } from 'react'

import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Divider, FAB, Modal, Portal, ProgressBar } from 'react-native-paper'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'

import styles from './styles'
import { useHeaderContext } from '../../../shared/contexts/header.context'
import StudentService from '../../../services/student-service'
import StudentAdd from '../StudentAdd'

const StudentList = () => {
  const [ students, setStudents ] = useState<Student[]>([])
  const [ progressVisible, setProgressVisible ] = useState<boolean>(false)
  const [ modalVisible, setModalVisible ] = useState<boolean>(false)

  const { state: { searchBarQuery } } = useHeaderContext()

  const studentService = StudentService.getInstance()
  const showModal = () => setModalVisible(true)
  const hideModal = () => setModalVisible(false)

  const getStudents = async () => {
    try {
      setProgressVisible(true)
      const students = await studentService.getStudents(searchBarQuery)
      setStudents(students)
    } catch (e) {
      console.log(e)
    } finally {
      setProgressVisible(false)
    }
  }

  useEffect(() => { (async () => { await getStudents() })() }, [ searchBarQuery ])

  // useEffect(() => {
  //   const interval = setInterval(getStudents, 300)
  //
  //   return () => clearInterval(interval)
  // }, [searchBarQuery]);

  const renderItem = (student: Student, index: number) => {

    return (
      <TouchableOpacity onPress={ () => { } }>
        <Text style={ styles.textItemName }>{ student.name }</Text>
        <Text style={ styles.textItemAge }>{ student.age } anos</Text>
        {
          index !== (students.length - 1) ? <Divider style={ styles.dividerItem }/> : null
        }
      </TouchableOpacity>
    )
  }

  return (
    <View style={ styles.container }>

      <StudentAdd visible={modalVisible} hideModal={hideModal} />

      <ProgressBar
        style={ styles.progressBar }
        visible={ progressVisible }
        color={ PRIMARY_COLOR }
        indeterminate/>


      <FlatList
        style={ styles.flatList }
        data={ students }
        renderItem={ ({ item, index }) => renderItem(item, index) }
        keyExtractor={ item => item.id.toString() }
      />

      <FAB
        style={ {
          position: 'absolute',
          backgroundColor: PRIMARY_COLOR,
          margin: 24,
          right: 0,
          bottom: 0
        } }
        icon="plus"
        color={ SECONDARY_COLOR }
        onPress={ showModal }
      />
    </View>
  )
}

export default StudentList