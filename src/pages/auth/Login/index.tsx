import React, { useState } from 'react'

import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { UserCredential } from '../../../interfaces/user'
import { SECONDARY_COLOR, TERCIARY_COLOR } from '../../../colors'

import { useAuth } from '../../../contexts/auth.context'

import styles from './styles'

const Login = () => {
  const [ credential, setCredential ] = useState<UserCredential>({} as UserCredential)
  const [ logging, setLogging ] = useState<boolean>(false)

  const { signIn } = useAuth()

  const onClickLogin = async () => {
    try {
      setLogging(true)
      await signIn(credential)
    } catch (e) {
      console.log(e)
      setLogging(false)
    }
  }

  return (
    <View style={ styles.container }>
      <Image source={ require('../../../assets/logo-login4.png') } style={ styles.logo }/>
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