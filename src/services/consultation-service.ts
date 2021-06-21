import { Consultation } from '../entities/consultation'
import { api } from '../shared/services/api'

const consultationUrl = 'consultations/'

const getConsultations = async (student: number): Promise<Consultation[]> => {
  // const params = { student, concluded: true }
  const params = { student }
  const response = await api.get<Consultation[]>(consultationUrl, { params })

  return response.data.map(consultation => new Consultation(consultation))
}

const addConsultation = async (payload: any): Promise<Consultation> => {
  const response = await api.post<Consultation>(consultationUrl, payload)
  return new Consultation(response.data)
}

export { getConsultations, addConsultation }
