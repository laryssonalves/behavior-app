import React, { useEffect, useState } from 'react'

import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Divider, FAB, ProgressBar } from 'react-native-paper'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'

import { getStudents } from '../../../services/student-service'

import { Student } from '../../../entities/student'

import StudentForm from '../StudentForm'

import styles from './styles'
import GlobalStyle from '../../../styles/global-style'

import StudentListHeader from './Header'

class HeaderState {
  searchBar = {
    visible: false,
    query: '',
  }
  actionBar = {
    title: 'Estudantes'
  }
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [studentToEdit, setStudentToEdit] = useState<Student>({name: ''} as Student)
  const [studentFormVisible, setStudentFormVisible] = useState<boolean>(false)

  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())

  const navigation = useNavigation()

  const [progressVisible, setProgressVisible] = useState<boolean>(false)

  const showStudentFormModal = () => setStudentFormVisible(true)
  const hideStudentFormModal = () => {
    fetchStudents()
    setStudentFormVisible(false)
  }

  const fetchStudents = async () => {
    try {
      setProgressVisible(true)
      const students = await getStudents(headerState.searchBar.query)
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

  useEffect(() => {
    ;(async () => {
      await fetchStudents()
    })()
  }, [headerState.searchBar.query])

  const setSearchBarQuery = (query: string) => { 
    const searchBar = { ...headerState.searchBar, query }
    setHeaderState({ ...headerState, searchBar }) 
  }

  const setSearchBarVisible = (visible: boolean) => {
    const searchBar = { ...headerState.searchBar, visible, query: visible ? headerState.searchBar.query : '' }
    setHeaderState({ ...headerState, searchBar })
  }

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
        <StudentListHeader {...{ 
          headerState, 
          actions: {
            setSearchBarQuery,
            setSearchBarVisible
          }}} 
        />

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
