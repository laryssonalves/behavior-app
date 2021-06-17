import { Consultation } from '../entities/consultation'
import { api } from '../shared/services/api'

const consultationUrl = 'consultations/'

const getConsultations = async (student: number): Promise<Consultation[]> => {
  const params = { student, concluded: true }
  const response = await api.get<Consultation[]>(consultationUrl, { params })

  return response.data.map(consultation => new Consultation(consultation))
}

export { getConsultations }
