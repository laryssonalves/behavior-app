import moment, { Moment } from 'moment'

import { applicationTypeChoiceList } from './choices'

export class Student {
  readonly id: number
  name: string
  owner: number
  company: number
  age: number
  genre: number
  birth_date: Moment
  first_avaliation_date: Moment

  constructor(props?: Partial<Student>) {
    const birth_date = moment(props?.birth_date, 'YYYY-MM-DD')
    const first_avaliation_date = moment(props?.first_avaliation_date, 'YYYY-MM-DD')

    const momentDates = { birth_date, first_avaliation_date }

    Object.assign(this, props, momentDates)
  }

  getPayload() {
    return {
      ...this,
      birth_date: this.birth_date.format('YYYY-MM-DD'),
    }
  }
}

export class StudentExercise {
  readonly id: number
  student_id: number
  program: string
  application_type: number
  help_type: number
  total_attempts: number
  procedure: string
  concluded: boolean
  total_targets: number
  has_consultation: boolean

  constructor(props?: Partial<StudentExercise>) {
    Object.assign(this, props)
  }

  getApplicationTypeDescription(): string {
    return applicationTypeChoiceList().find(appType => appType.value === this.application_type)?.name || ''
  }
}

export interface StudentExerciseTarget {
  id: number
  target: string
}
