import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { TERCIARY_COLOR } from '../../../../colors'
import GlobalStyle from '../../../../styles/global-style'
import styles from './styles'

type Props = {
  btnNegative: {
    label: string
    onPress: () => void
  }
  btnPositive: {
    label: string
    onPress: () => void
    loading?: boolean
  }
}

export default ({ btnNegative, btnPositive }: Props) => (
  <>
    <TouchableOpacity style={styles.btnDefault} onPress={btnNegative.onPress}>
      <Text style={GlobalStyle.btnPrimaryText}>{btnNegative.label}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btnPrimary} onPress={btnPositive.onPress}>
      {btnPositive.loading ? (
        <ActivityIndicator animating={true} color={TERCIARY_COLOR} />
      ) : (
        <Text style={GlobalStyle.btnPrimaryText}>{btnPositive.label}</Text>
      )}
    </TouchableOpacity>
  </>
)
