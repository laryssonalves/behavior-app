import moment, { Moment } from "moment"
import { ResultTypeChoice } from "./choices"
import { StudentExercise, StudentExerciseTarget } from "./student"
import { User } from "./user"

export class Consultation {
  id: number
  create_date: Moment
  concluded: boolean
  concluded_date: Moment
  owner: User
  exercises: ConsultationExercise[]

  constructor(props?: Partial<Consultation>) {
    const create_date = moment(props?.create_date, 'YYYY-MM-DDTHH:mm:ss')
    const concluded_date = moment(props?.concluded_date, 'YYYY-MM-DDTHH:mm:ss')
    const exercises = props?.exercises?.map(exercise => new ConsultationExercise(exercise))

    const parsedData = { create_date, concluded_date, exercises }

    Object.assign(this, props, parsedData)
  }

  getDuration() {
    const daysDiff = this.concluded_date.diff(this.create_date, 'days')
    const diff = moment.utc(moment.duration(this.concluded_date.diff(this.create_date)).asMilliseconds())
    const days = daysDiff ? `${daysDiff}d` : ''
    const hours = diff.hours() ? `${diff.hours()}h` : ''
    const min = `${diff.minutes()}min`
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
  id: number
  consultation_id: number
  exercise = new StudentExercise()
  targets: ConsultationExerciseTarget[]

  constructor(props?: Partial<ConsultationExercise>) {
    const exercise = new StudentExercise(props?.exercise)
    Object.assign(this, props, { exercise })
  }
}

interface ConsultationExerciseTarget {
  id: number
  consultation_exercise_id: number
  result_type: ResultTypeChoice
  target: StudentExerciseTarget
}