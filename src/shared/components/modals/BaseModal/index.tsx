import React from 'react'
import { Text, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import GlobalStyle from '../../../../styles/global-style'
import ModalActionButtons from '../ModalActionButtons'
import BaseModalBody from './BaseModalBody'

type Props = {
  visible: boolean
  title: string
  body: any
  onDismiss: () => void
  buttons: {
    negative: {
      label: string
      onPress: () => void
    }
    positive: {
      label: string
      onPress: () => void
      loading: boolean
    }
  }
}

export default ({ visible, onDismiss, body, title, buttons }: Props) => (
  <Portal>
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={GlobalStyle.modalContainer}>
      <Text style={GlobalStyle.modalTitle}>{title}</Text>
      <View style={GlobalStyle.modalBody}>
        <BaseModalBody body={body} />
      </View>
      <View style={GlobalStyle.modalFooter}>
        <ModalActionButtons btnPositive={buttons.positive} btnNegative={buttons.negative} />
      </View>
    </Modal>
  </Portal>
)
