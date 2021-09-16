import React, { useState } from 'react'

import { ActivityIndicator, Image, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import { Snackbar } from 'react-native-paper'

import { UserCredential } from '../../../entities/user'
import { SECONDARY_COLOR, TERCIARY_COLOR } from '../../../colors'

import { useAuth } from '../../../contexts/auth.context'

import styles from './styles'

const Login = () => {
  const [credential, setCredential] = useState<UserCredential>({} as UserCredential)
  const [logging, setLogging] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const [snackBarVisible, setSnackBarVisible] = useState(false)

  const showSnackBar = () => setSnackBarVisible(true)

  const onDismissSnackBar = () => setSnackBarVisible(false)

  const tooglePasswordVisibility = () => setPasswordVisible(!passwordVisible)

  const passwordInputIcon = passwordVisible ? 'eye-slash' : 'eye'

  const { signIn } = useAuth()

  const onClickLogin = async () => {
    try {
      setSubmitted(true)
      setLogging(true)
      await signIn(credential)
    } catch (e) {
      showSnackBar()
      setLogging(false)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo-login4.png')} style={styles.logo} />
      <View style={submitted && !credential.email ? styles.inputViewError : styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          autoCapitalize="none"
          placeholderTextColor={SECONDARY_COLOR}
          onChangeText={email => setCredential({ ...credential, email })}
        />
      </View>
      <View style={submitted && !credential.password ? styles.inputViewError : styles.inputView}>
        <TextInput
          secureTextEntry={!passwordVisible}
          style={styles.inputText}
          placeholder="Senha..."
          placeholderTextColor={SECONDARY_COLOR}
          onChangeText={password => setCredential({ ...credential, password })}
        />
        <FontAwesome5 name={passwordInputIcon} onPress={tooglePasswordVisibility} size={16} />
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={onClickLogin} disabled={logging}>
        {logging ? (
          <ActivityIndicator animating={true} color={TERCIARY_COLOR} />
        ) : (
          <Text style={styles.btnLoginText}>LOGIN</Text>
        )}
      </TouchableOpacity>
      <Snackbar visible={snackBarVisible} onDismiss={onDismissSnackBar} duration={3000}>
        Credenciais inválidas
      </Snackbar>
    </View>
  )
}

export default Login
