import moment, { Moment } from "moment"
import { ResultTypeChoice } from "./choices"
import { Student, StudentExercise, StudentExerciseTarget } from "./student"
import { User } from "./user"


export class Consultation {
  readonly id: number
  create_date: Moment
  concluded: boolean
  concluded_date: Moment
  owner: User
  student: Student

  constructor(props?: Partial<Consultation>) {
    const create_date = moment(props?.create_date, 'YYYY-MM-DDTHH:mm:ss')
    const concluded_date = moment(props?.concluded_date, 'YYYY-MM-DDTHH:mm:ss')
    const parsedData = { create_date, concluded_date }

    Object.assign(this, props, parsedData)
  }

  getDuration() {
    const daysDiff = this.concluded_date.diff(this.create_date, 'days')
    const diff = moment.utc(moment.duration(this.concluded_date.diff(this.create_date)).asMilliseconds())
    const days = daysDiff ? `${daysDiff}d` : ''
    const hours = diff.hours() ? `${diff.hours()}h` : ''
    const min = diff.minutes() ? `${diff.minutes()}min` : ''
    return `${days} ${hours} ${min}`
  }

  toJson() {
    return JSON.stringify(this)
  }

  static fromJson(data: string) {
    return new Consultation(JSON.parse(data))
  }
}

export class ConsultationExercise {
  readonly id: number
  consultation_id: number
  exercise: StudentExercise
  concluded: boolean
  concluded_date: Moment

  constructor(props?: Partial<ConsultationExercise>) {
    const exercise = new StudentExercise(props?.exercise)
    const concluded_date = moment(props?.concluded_date, 'YYYY-MM-DDTHH:mm:ss')
    const parsedData = { exercise, concluded_date }
    Object.assign(this, props, parsedData)
  }

  toJson() {
    return JSON.stringify(this)
  }

  static fromJson(data: string) {
    return new ConsultationExercise(JSON.parse(data))
  }
}

export class ConsultationExerciseTarget {
  readonly id: number
  consultation_exercise_id: number
  result_type: ResultTypeChoice
  student_target: StudentExerciseTarget

  //frontend variables
  showOptions = true

  constructor(props?: Partial<ConsultationExerciseTarget>) {
    Object.assign(this, props)
  }

  isNotApplied(): boolean {
    return this.result_type === ResultTypeChoice.NOT_APPLIED
  }
}