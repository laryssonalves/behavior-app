import React, { useState } from 'react'
import { useEffect } from 'react'

import { ConsultationExerciseDataType, ConsultationExerciseStepProvider } from './context'
import ConsultationExerciseStep from './index'

const useConsultationExerciseStepModal = () => {
  const [visible, setVisible] = useState(false)

  const showConsultationExerciseStepModal = () => setVisible(true)
  const hideConsultationExerciseStepModal = () => setVisible(false)

  const ConsultationExerciseStepModal = (data: ConsultationExerciseDataType) => (
    <ConsultationExerciseStepProvider>
      <ConsultationExerciseStep
        modalProps={{
          visible,
          hide: hideConsultationExerciseStepModal,
        }}
        consultationExerciseData={data}
      />
    </ConsultationExerciseStepProvider>
  )

  return { ConsultationExerciseStepModal, showConsultationExerciseStepModal, hideConsultationExerciseStepModal }
}

export default useConsultationExerciseStepModal
