import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Modal, Portal } from 'react-native-paper'
import { TERCIARY_COLOR } from '../../../colors'

import { Consultation } from '../../../entities/consultation'
import GlobalStyle from '../../../styles/global-style'
import { editConsultation } from '../../../services/consultation-service'
import styles from './styles'

type ConsultationUnconcludedProps = {
  consultation: Consultation | null
  hideModal: () => void
}

const ConsultationUnconcluded = ({ consultation, hideModal }: ConsultationUnconcludedProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  const concludeConsultation = () => {
    if (!consultation) {
      return
    }

    setIsLoading(true)

    const payload = { concluded: true }

    editConsultation(consultation?.id, payload)
      .then(() => {
        setIsLoading(false)
        hideModal()
      })
      .catch(e => console.log(e))
  }

  const navigateToConsultationDetails = () => {
    setIsLoading(true)
    hideModal()
    navigation.navigate('ConsultationDetail', { consultation: consultation?.toJson() })
    setIsLoading(false)
  }

  return (
    <Portal>
      <Modal visible={!!consultation} onDismiss={hideModal} contentContainerStyle={GlobalStyle.modalContainer}>
        <Text style={GlobalStyle.modalTitle}>Atendimento em andamento</Text>
        <View style={GlobalStyle.modalBody}>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoField} numberOfLines={1}>
              ID
            </Text>
            <View style={styles.rowInfoValueContainer}>
              <Text style={styles.rowInfoValue} numberOfLines={1}>
                {consultation?.id}
              </Text>
            </View>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoField} numberOfLines={1}>
              Estudante
            </Text>
            <View style={styles.rowInfoValueContainer}>
              <Text style={styles.rowInfoValue} numberOfLines={1}>
                {consultation?.student.name}
              </Text>
            </View>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoField} numberOfLines={1}>
              Terapeuta
            </Text>
            <View style={styles.rowInfoValueContainer}>
              <Text style={styles.rowInfoValue} numberOfLines={1}>
                {consultation?.owner.name}
              </Text>
            </View>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.rowInfoField} numberOfLines={1}>
              Criado
            </Text>
            <View style={styles.rowInfoValueContainer}>
              <Text style={styles.rowInfoValue} numberOfLines={1}>
                {consultation?.create_date.format('DD/MM/YYYY - HH:mm')}
              </Text>
            </View>
          </View>
        </View>
        <View style={GlobalStyle.modalFooter}>
          <TouchableOpacity style={styles.btnDefault} onPress={concludeConsultation} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator animating={true} color={TERCIARY_COLOR} />
            ) : (
              <Text style={GlobalStyle.btnPrimaryText}>FINALIZAR</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnPrimary} onPress={navigateToConsultationDetails} disabled={isLoading}>
            <Text style={GlobalStyle.btnPrimaryText}>CONTINUAR</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  )
}

export default ConsultationUnconcluded
