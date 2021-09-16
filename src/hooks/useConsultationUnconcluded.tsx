import React, { useEffect, useState } from 'react'
import { Consultation } from '../entities/consultation'
import ConsultationUnconcluded from '../pages/consultation/ConsultationUnconcluded'
import { verifyHasUnconcludedConsultation } from '../services/consultation-service'

const useConsultationUnconcluded = () => {
  const [consultation, setConsultation] = useState<Consultation | null>(null)

  const hasToShowConsultationUnconcluded = async () => {
    const consultationUnconcluded = await verifyHasUnconcludedConsultation()

    if (consultationUnconcluded) {
      setConsultation(consultationUnconcluded)
    }
  }

  const hideConsultationUnconcluded = () => setConsultation(null)

  useEffect(() => {
    hasToShowConsultationUnconcluded()
  }, [])

  const ConsultationUnconcludedModal = () => (
    <ConsultationUnconcluded consultation={consultation} hideModal={hideConsultationUnconcluded} />
  )

  return [ConsultationUnconcludedModal]
}

export default useConsultationUnconcluded
