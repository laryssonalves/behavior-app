import React from 'react'
import { View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Text } from 'react-native-paper'
import { SECONDARY_COLOR } from '../../../colors'
import styles from './styles'

type Props = {
  text: string
}

const EmptyList = ({ text }: Props) => (
  <View style={styles.container}>
    <FontAwesome5 name="clipboard-list" color={SECONDARY_COLOR} size={50} />
    <Text style={styles.text}>{text}</Text>
  </View>
)

export default EmptyList
