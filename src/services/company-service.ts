import { api } from '../shared/services/api'

import Company from '../models/company.model'

const companyUrl = 'company/'

const getSelectedCompany = async (): Promise<Company> => {
  const url = `${companyUrl}selected`

  const response = await api.get(url)

  return response.data as Company
}

export { getSelectedCompany }