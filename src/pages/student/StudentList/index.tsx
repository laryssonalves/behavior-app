import React, { useEffect, useState } from 'react'

import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Divider, FAB, ProgressBar } from 'react-native-paper'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'

import { getStudents } from '../../../services/student-service'

import { Student } from '../../../entities/student'

import StudentForm from '../StudentForm'

import styles from './styles'
import GlobalStyle from '../../../styles/global-style'

import StudentListHeader from './Header'
import { isLastIndex } from '../../../utils'
import useProgressBar from '../../../hooks/useProgressBar'
import { verifyHasUnconcludedConsultation } from '../../../services/consultation-service'
import { Consultation } from '../../../entities/consultation'
import ConsultationUnconcluded from '../../consultation/ConsultationUnconcluded'

class HeaderState {
  searchBar = {
    visible: false,
    query: '',
  }
  actionBar = {
    title: 'Estudantes',
  }
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [studentToEdit, setStudentToEdit] = useState<Student>({ name: '' } as Student)
  const [studentFormVisible, setStudentFormVisible] = useState<boolean>(false)
  const [consultationUnconcluded, setConsultationUnconcluded] = useState<Consultation | null>(null)

  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())

  const navigation = useNavigation()

  const [Progress, showProgress, hideProgress] = useProgressBar()

  const showStudentFormModal = () => setStudentFormVisible(true)
  const hideStudentFormModal = () => {
    fetchStudents()
    setStudentFormVisible(false)
  }

  const hasToShowConsultationUnconcluded = async () => {
    const consultation = await verifyHasUnconcludedConsultation()

    if (consultation) {
      setConsultationUnconcluded(consultation)
    }
  }

  const fetchStudents = async () => {
    try {
      showProgress()
      const students = await getStudents(headerState.searchBar.query)
      setStudents(students)
    } catch (e) {
      console.log(e)
    } finally {
      hideProgress()
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
    fetchStudents()
    hasToShowConsultationUnconcluded()
  }, [headerState.searchBar.query])

  const setSearchBarQuery = (query: string) => {
    const searchBar = { ...headerState.searchBar, query }
    setHeaderState({ ...headerState, searchBar })
  }

  const setSearchBarVisible = (visible: boolean) => {
    const searchBar = { ...headerState.searchBar, visible, query: visible ? headerState.searchBar.query : '' }
    setHeaderState({ ...headerState, searchBar })
  }

  const headerProps = {
    headerState,
    actions: {
      setSearchBarQuery,
      setSearchBarVisible,
    },
  }

  const renderItem = (student: Student, isLastIndex: boolean) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          goToStudentDetail(student)
        }}
        onLongPress={() => editStudent(student)}
        style={styles.flatListItem}>
        <Text style={styles.textItemName}>{student.name}</Text>
        <Text style={styles.textItemAge}>{student.age} anos</Text>
      </TouchableOpacity>
      {!isLastIndex && <Divider style={styles.dividerItem} />}
    </View>
  )

  const refreshControl = (
    <RefreshControl
      progressBackgroundColor="#FFF"
      colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
      refreshing={false}
      onRefresh={async () => {
        await fetchStudents()
        await hasToShowConsultationUnconcluded()
      }}
    />
  )

  const hideConsultationUnconcluded = () => setConsultationUnconcluded(null)

  return (
    <View style={GlobalStyle.container}>
      <StudentListHeader {...headerProps} />

      <StudentForm visible={studentFormVisible} hideModal={hideStudentFormModal} studentToEdit={studentToEdit} />
      <ConsultationUnconcluded consultation={consultationUnconcluded} hideModal={hideConsultationUnconcluded} />

      <Progress />

      <FlatList
        style={styles.flatList}
        data={students}
        refreshControl={refreshControl}
        renderItem={({ item, index }) => renderItem(item, isLastIndex(index, students))}
        keyExtractor={item => item.id.toString()}
      />

      <FAB style={styles.fabAdd} icon="plus" color={SECONDARY_COLOR} onPress={showStudentFormModal} />
    </View>
  )
}

export default StudentList
