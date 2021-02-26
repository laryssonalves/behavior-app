import React, { useEffect, useState } from 'react'

import { FlatList, RefreshControl, Text, TouchableOpacity, View, StyleSheet } from 'react-native'

import { Divider, FAB, ProgressBar } from 'react-native-paper'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'

import { useHeaderContext } from '../../../shared/contexts/header.context'

import StudentService from '../../../services/student-service'

import { Student } from '../../../models/student'

import StudentAdd from '../StudentAdd'
import StudentEdit from '../StudentEdit'

import styles from './styles'

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [studentEdit, setStudentEdit] = useState<Student>({} as Student)
  const [progressVisible, setProgressVisible] = useState<boolean>(false)
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)

  const { state: { searchBarQuery } } = useHeaderContext()

  const studentService = StudentService.getInstance()

  const showAddModal = () => setAddModalVisible(true)
  const hideAddModal = () => {
    getStudents()
    setAddModalVisible(false)
  }

  const showEditModal = () => setEditModalVisible(true)
  const hideEditModal = () => {
    getStudents()
    setEditModalVisible(false)
  }

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

  const editStudent = (student: Student) => {
    setStudentEdit(student)
    showEditModal()
  }

  useEffect(() => { (async () => { await getStudents() })() }, [searchBarQuery])

  const renderItem = (student: Student, index: number) => (
    <View>
      <TouchableOpacity onPress={() => editStudent(student)} style={styles.flatListItem}>
        <Text style={styles.textItemName}>{student.name}</Text>
        <Text style={styles.textItemAge}>{student.age} anos</Text>
      </TouchableOpacity>
      {
        index !== (students.length - 1) ? <Divider style={styles.dividerItem} /> : null
      }
    </View>
  )



  const refreshControl = (
    <RefreshControl
      progressBackgroundColor='#FFF'
      colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
      refreshing={false}
      onRefresh={async () => await getStudents()} />
  )

  return (
    <View style={styles.container}>

      <StudentAdd visible={addModalVisible} hideModal={hideAddModal} />
      <StudentEdit visible={editModalVisible} hideModal={hideEditModal} student={studentEdit} />

      <ProgressBar
        style={styles.progressBar}
        visible={progressVisible}
        color={PRIMARY_COLOR}
        indeterminate />

      <FlatList
        style={styles.flatList}
        data={students}
        refreshControl={refreshControl}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={item => item.id.toString()}
      />

      <FAB
        style={styles.fabAdd}
        icon="plus"
        color={SECONDARY_COLOR}
        onPress={showAddModal}
      />
    </View>
  )
}

export default StudentList