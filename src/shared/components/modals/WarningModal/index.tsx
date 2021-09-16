import React from 'react'

import { Text, ActivityIndicator, TouchableOpacity, View } from 'react-native'

import { Modal, Portal } from 'react-native-paper'
import { TERCIARY_COLOR } from '../../../../colors'
import GlobalStyle from '../../../../styles/global-style'
import styles from './styles'

const WarningModal = (props: any) => {
  const { modalState, hideModal, btnStates } = props

  const { modalVisible, modalText } = modalState

  const { btnNegative, btnPositive } = btnStates

  return (
    <Portal>
      <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={GlobalStyle.modalContainer}>
        <Text style={GlobalStyle.modalTitle}>Aviso</Text>
        <Text style={GlobalStyle.modalBody}>{modalText}</Text>
        <View style={GlobalStyle.modalFooter}>
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
        </View>
      </Modal>
    </Portal>
  )
}

export default WarningModal
