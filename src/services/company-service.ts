import { api } from './api'

import Company from '../models/company.model'

export default class CompanyService {
  private static instance: CompanyService

  private companyUrl = 'company/'

  constructor() {}

  public static getInstance(): CompanyService {
    if (!CompanyService.instance) {
      CompanyService.instance = new CompanyService()
    }
    return CompanyService.instance
  }


  async getSelectedCompany(): Promise<Company> {
    const url = `${this.companyUrl}selected`

    const response = await api.get(url)

    return response.data as Company
  }
}

