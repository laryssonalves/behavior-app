import React, { useEffect, useState } from 'react'

import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Divider, FAB } from 'react-native-paper'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../colors'

import { getStudents } from '../../../services/student-service'

import { Student } from '../../../entities/student'

import StudentForm from '../StudentForm'

import styles from './styles'
import GlobalStyle from '../../../styles/global-style'

import StudentListHeader from './Header'
import { isLastIndex } from '../../../utils'
import useProgressBar from '../../../hooks/useProgressBar'
import { useAuth } from '../../../contexts/auth.context'
import ConsultationUnconcluded from '../../consultation/ConsultationUnconcluded'
import { Consultation } from '../../../entities/consultation'
import * as ConsultationService from '../../../services/consultation-service'

class HeaderState {
  searchBar = {
    visible: false,
    query: '',
  }
  actionBar = {
    title: 'Aprendentes',
  }
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [studentToEdit, setStudentToEdit] = useState<Student>({ name: '' } as Student)
  const [studentFormVisible, setStudentFormVisible] = useState<boolean>(false)
  const [unconcludedConsultation, setUnconcludedConsultation] = useState<Consultation>()

  const [headerState, setHeaderState] = useState<HeaderState>(new HeaderState())

  const navigation = useNavigation()

  const { user } = useAuth()
  const { ProgressIndicator, showProgress, hideProgress } = useProgressBar()

  const showStudentFormModal = () => setStudentFormVisible(true)
  const hideStudentFormModal = () => {
    fetchStudents()
    setStudentFormVisible(false)
  }

  const fetchStudents = async () => {
    try {
      showProgress()
      const result = await getStudents(headerState.searchBar.query)
      setStudents(result)
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

  const renderItem = (student: Student, isLast: boolean) => (
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
      {!isLast && <Divider style={styles.dividerItem} />}
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

  useEffect(() => {
    fetchStudents()
  }, [headerState.searchBar.query])

  useEffect(() => {
    const hasUnconcludedConsultation = async () => {
      const consultationUnconcluded = await ConsultationService.verifyHasUnconcludedConsultation(user?.id)
  
      if (consultationUnconcluded) {
        setUnconcludedConsultation(consultationUnconcluded)
      }
    }

    hasUnconcludedConsultation()
  }, [user])

  return (
    <View style={GlobalStyle.container}>
      <StudentListHeader {...headerProps} />

      <ProgressIndicator />

      <StudentForm visible={studentFormVisible} hideModal={hideStudentFormModal} studentToEdit={studentToEdit} />
      {
        unconcludedConsultation && (
          <ConsultationUnconcluded
            consultation={unconcludedConsultation} 
            hideModal={() => setUnconcludedConsultation(undefined)} />
        )
      }

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
