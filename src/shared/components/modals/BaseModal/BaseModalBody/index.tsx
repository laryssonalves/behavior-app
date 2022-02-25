import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

type Props = {
  body: any
}

export default ({ body }: Props) => <>{typeof body === 'string' ? <Text>{body}</Text> : <View>{body}</View>}</>
