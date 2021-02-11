import React, { useEffect, useState } from 'react'

import { FlatList, Text, TouchableOpacity, View } from 'react-native'

import { Divider, Modal, Portal, ProgressBar } from 'react-native-paper'

import { api } from '../../../services/api'

import { PRIMARY_COLOR } from '../../../colors'

import styles from './styles'

const StudentList = ({ searchQuery, modalVisible }: any) => {
  const [ students, setStudents ] = useState<Student[]>([])
  const [ progressVisible, setProgressVisible ] = useState<boolean>(false)

  const studentUrl = 'student'

  const getStudents = async () => {
    try {
      setProgressVisible(true)

      const params = searchQuery ? { name: searchQuery } : {}

      const { data } = await api.get(studentUrl, { params })

      setStudents(data)
    } catch (e) {
      console.log(e)
    } finally {
      setProgressVisible(false)
    }
  }

  useEffect(() => { (async () => { await getStudents() })() }, [ searchQuery ])

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
      <Portal>
        <Modal visible={ modalVisible } contentContainerStyle={ { backgroundColor: 'white', margin: 32, padding: 16 } }>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
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
    </View>
  )
}

export default StudentList