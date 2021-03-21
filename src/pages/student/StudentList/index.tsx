import React, { useCallback, useEffect, useState } from 'react'

import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Divider, FAB, ProgressBar } from 'react-native-paper'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'

import { useHeaderContext } from '../../../shared/contexts/header.context'

import { getStudents } from '../../../services/student-service'

import { Student } from '../../../entities/student'

import StudentForm from '../StudentForm'

import styles from './styles'
import GlobalStyle from '../../../styles/global-style'

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [studentToEdit, setStudentToEdit] = useState<Student>({
    name: ''
  } as Student)
  const [studentFormVisible, setStudentFormVisible] = useState<boolean>(false)

  const navigation = useNavigation()

  const [progressVisible, setProgressVisible] = useState<boolean>(false)

  const { state, actions } = useHeaderContext()

  const showStudentFormModal = () => setStudentFormVisible(true)
  const hideStudentFormModal = () => {
    fetchStudents()
    setStudentFormVisible(false)
  }

  const fetchStudents = async () => {
    try {
      setProgressVisible(true)
      const students = await getStudents(state.searchBarQuery)
      setStudents(students)
    } catch (e) {
      console.log(e)
    } finally {
      setProgressVisible(false)
    }
  }

  const editStudent = (student: Student) => {
    setStudentToEdit(student)
    showStudentFormModal()
  }

  const goToStudentDetail = (student: Student) => {
    const { id, name } = student
    navigation.navigate('StudentDetail', { id, name })
  }

  useFocusEffect(
    useCallback(() => {
      actions.setActionBarTitle('Estudantes')
    }, [])
  )

  useEffect(() => {
    ;(async () => {
      await fetchStudents()
    })()
  }, [state.searchBarQuery])

  const renderItem = (student: Student, index: number) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          goToStudentDetail(student)
        }}
        onLongPress={() => editStudent(student)}
        style={styles.flatListItem}
      >
        <Text style={styles.textItemName}>{student.name}</Text>
        <Text style={styles.textItemAge}>{student.age} anos</Text>
      </TouchableOpacity>
      {index !== students.length - 1 ? (
        <Divider style={styles.dividerItem} />
      ) : null}
    </View>
  )

  const refreshControl = (
    <RefreshControl
      progressBackgroundColor="#FFF"
      colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
      refreshing={false}
      onRefresh={async () => await fetchStudents()}
    />
  )

  return (
    <View style={GlobalStyle.container}>
      <StudentForm
        visible={studentFormVisible}
        hideModal={hideStudentFormModal}
        studentToEdit={studentToEdit}
      />

      <ProgressBar
        style={styles.progressBar}
        visible={progressVisible}
        color={PRIMARY_COLOR}
        indeterminate
      />

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
        onPress={showStudentFormModal}
      />
    </View>
  )
}

export default StudentList
