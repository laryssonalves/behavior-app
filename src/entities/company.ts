import { CorePerson, CorePersonValidationError } from './core-person'

export default interface Company extends CorePerson {
  responsible_name: string
  responsible_email: string
  responsible_phone: string

  errors: CompanyValidationError
}

interface CompanyValidationError extends CorePersonValidationError {
  responsible_name: string[]
  responsible_email: string[]
  responsible_phone: string[]
}
