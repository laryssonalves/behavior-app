import { Consultation, ConsultationExercise, ConsultationExerciseTarget } from '../entities/consultation'
import { api } from '../shared/services/api'

const consultationUrl = 'consultations/'
const consultationDetailUrl = (consultationId: number) => `${consultationUrl}${consultationId}/`
const consultationExerciseUrl = (consultationId: number) => `${consultationDetailUrl(consultationId)}exercises/`

const getConsultations = async (student: number): Promise<Consultation[]> => {
  const params = { student, concluded: true }
  const response = await api.get<Consultation[]>(consultationUrl, { params })

  return response.data.map(consultation => new Consultation(consultation))
}

const getConsultation = async (consultationId: number): Promise<Consultation> => {
  const response = await api.get<Consultation>(consultationDetailUrl(consultationId))
  return new Consultation(response.data)
}

const deleteConsultation = async (consultationId: number): Promise<void> => {
  await api.delete(consultationDetailUrl(consultationId))
}

const addConsultation = async (payload: any): Promise<Consultation> => {
  const response = await api.post<Consultation>(consultationUrl, payload)
  return new Consultation(response.data)
}

const editConsultation = async (consultationId: number, payload: any): Promise<Consultation> => {
  const consultationDetailUrl = `${consultationUrl}${consultationId}/`
  const response = await api.patch<Consultation>(consultationDetailUrl, payload)
  return new Consultation(response.data)
}

const sendConsultationExerciseTargetAnswers = async (consultationId: number, payload: any): Promise<void> => {
  const targetsAnswersUrl = `${consultationExerciseUrl(consultationId)}targets-answers/`
  await api.post(targetsAnswersUrl, payload)
}

const getConsultationExerciseTargets = 
  async (consultationId: number, consultationExerciseId: number): Promise<ConsultationExerciseTarget[]> => {
    const targetListUrl = `${consultationExerciseUrl(consultationId)}${consultationExerciseId}/targets-list/`
    const response = await api.get<ConsultationExerciseTarget[]>(targetListUrl)

    return response.data.map(consultationExerciseTarget => new ConsultationExerciseTarget(consultationExerciseTarget))
  }

const getConsultationExercises = async (consultationId: number): Promise<ConsultationExercise[]> => {
  const response = await api.get<ConsultationExercise[]>(consultationExerciseUrl(consultationId))

  return response.data.map(consultationExercise => new ConsultationExercise(consultationExercise))
}

export { 
  getConsultations, 
  getConsultation,
  addConsultation, 
  editConsultation,
  deleteConsultation,
  sendConsultationExerciseTargetAnswers, 
  getConsultationExerciseTargets,
  getConsultationExercises
}
