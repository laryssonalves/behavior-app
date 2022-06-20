import moment, { Moment } from 'moment'
import { ApplicationTypeChoice, applicationTypeChoiceList, HelpTypeChoice, ResultTypeChoice } from './choices'
import { Student, StudentExercise, StudentExerciseTarget } from './student'
import { User } from './user'

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
  program: string
  application_type: ApplicationTypeChoice
  application_type_description: string
  help_type: HelpTypeChoice
  help_type_description: string
  help_description: string
  total_attempts: number
  procedure: string
  concluded: boolean
  concluded_date: Moment
  create_date: Moment
  result: ConsultationExerciseResult
  targets: ConsultationExerciseTarget[]
  is_applied: boolean
  total_targets_answered: number
  total_targets_correct: number
  percentage_correct_targets: number

  constructor(props?: Partial<ConsultationExercise>) {
    const exercise = new StudentExercise(props?.exercise)
    const concluded_date = moment(props?.concluded_date, 'YYYY-MM-DDTHH:mm:ss')
    const create_date = moment(props?.create_date, 'YYYY-MM-DDTHH:mm:ss')
    const targets = props?.targets?.map(target => new ConsultationExerciseTarget(target))
    const parsedData = { exercise, concluded_date, create_date, targets }
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
  result_type_description: string
  student_target: StudentExerciseTarget
  target_description: string
  sequence: number
  application_sequence: number

  //frontend variables
  showOptions = true

  constructor(props?: Partial<ConsultationExerciseTarget>) {
    Object.assign(this, props)
  }

  isWrong(): boolean {
    return this.checkResult(ResultTypeChoice.WRONG)
  }

  isIndependent(): boolean {
    return this.checkResult(ResultTypeChoice.INDEPENDENT)
  }

  isCorrectWithHelp(): boolean {
    return this.checkResult(ResultTypeChoice.CORRECT_WITH_HELP)
  }

  private checkResult(resultType: ResultTypeChoice): boolean {
    return this.result_type === resultType
  }
}

export class ConsultationExerciseResult {
  result_indepent: number
  result_correct_with_help: number
  result_wrong: number
}
