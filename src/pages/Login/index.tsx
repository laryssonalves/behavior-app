import React, { useEffect, useState } from 'react'

import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { User, UserCredential } from '../../interfaces/user'
import { SECONDARY_COLOR, TERCIARY_COLOR } from '../../colors'

import api from '../../services/api'
import * as SecureStorage from '../../services/secure-storage'

import styles from './styles'

const Login = () => {
  const [ credential, setCredential ] = useState<UserCredential>({} as UserCredential)
  const [ logging, setLogging ] = useState<boolean>(false)
  const navigation = useNavigation()

  const loginUrl = 'auth/login/'
  const userDetailsUrl = 'users/details/'

  useEffect(() => {
    const verifyTokenExists = async () => {
      const token = await SecureStorage.retrieveItem('token')
      if (token) {
        goToStudentList()
      }
    }
    verifyTokenExists()
  })

  const goToStudentList = () => {
    navigation.navigate('StudentList')
  }

  const onClickLogin = async () => {
    try {
      setLogging(true)

      const tokenResponse = await api.post(loginUrl, credential)
      const { token } = tokenResponse.data as TokenResponse

      const headers = { Authorization: `Token ${ token }` }
      const userDetailsResponse = await api.get(userDetailsUrl, { headers })
      const userDetails = userDetailsResponse.data as User

      await SecureStorage.storeItem('token', JSON.stringify(token))
      await SecureStorage.storeItem('user_details', JSON.stringify(userDetails))

      goToStudentList()
    } catch (error) {
      console.log(error)
    } finally {
      setLogging(false)
    }
  }


  return (
    <View style={ styles.container }>
      <Image source={ require('../../assets/logo-login4.png') } style={ styles.logo }/>
      <View style={ styles.inputView }>
        <TextInput
          style={ styles.inputText }
          placeholder="Email..."
          placeholderTextColor={ SECONDARY_COLOR }
          onChangeText={ email => setCredential({ ...credential, email }) }/>
      </View>
      <View style={ styles.inputView }>
        <TextInput
          secureTextEntry
          style={ styles.inputText }
          placeholder="Senha..."
          placeholderTextColor={ SECONDARY_COLOR }
          onChangeText={ password => setCredential({ ...credential, password }) }/>
      </View>
      <TouchableOpacity
        style={ styles.btnLogin }
        onPress={ onClickLogin }
        disabled={ logging }>
        {
          logging ?
            <ActivityIndicator animating={ true } color={ TERCIARY_COLOR }/> :
            <Text style={ styles.btnLoginText }>LOGIN</Text>
        }
      </TouchableOpacity>
    </View>
  )
}

export default Login