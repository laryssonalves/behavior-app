import { Consultation, ConsultationExercise, ConsultationExerciseTarget } from '../entities/consultation'
import { api } from '../shared/services/api'

type ConsultationParams = {
  student?: number
  concluded?: boolean
  owner?: number
}

const consultationUrl = 'consultations/'
const consultationDetailUrl = (consultationId: number) => `${consultationUrl}${consultationId}/`
const consultationExerciseUrl = (consultationId: number) => `${consultationDetailUrl(consultationId)}exercises/`

const getConsultations = async (params: ConsultationParams): Promise<Consultation[]> => {
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
  const response = await api.patch<Consultation>(consultationDetailUrl(consultationId), payload)
  return new Consultation(response.data)
}

const sendConsultationExerciseTargetAnswers = async (consultationId: number, payload: any): Promise<void> => {
  const targetsAnswersUrl = `${consultationExerciseUrl(consultationId)}targets-answers/`
  await api.post(targetsAnswersUrl, payload)
}

const getConsultationExerciseTargets = async (
  consultationId: number,
  consultationExerciseId: number
): Promise<ConsultationExerciseTarget[]> => {
  const targetListUrl = `${consultationExerciseUrl(consultationId)}${consultationExerciseId}/targets-list/`
  const response = await api.get<ConsultationExerciseTarget[]>(targetListUrl)

  return response.data.map(consultationExerciseTarget => new ConsultationExerciseTarget(consultationExerciseTarget))
}

const getConsultationExercises = async (consultationId: number): Promise<ConsultationExercise[]> => {
  const response = await api.get<ConsultationExercise[]>(consultationExerciseUrl(consultationId))

  return response.data.map(consultationExercise => new ConsultationExercise(consultationExercise))
}

const verifyHasUnconcludedConsultation = async (owner?: number): Promise<Consultation | null> => {
  const results = await getConsultations({ concluded: false, owner })

  return results.length ? results[0] : null
}

export {
  getConsultations,
  getConsultation,
  addConsultation,
  editConsultation,
  deleteConsultation,
  sendConsultationExerciseTargetAnswers,
  getConsultationExerciseTargets,
  getConsultationExercises,
  verifyHasUnconcludedConsultation,
}
