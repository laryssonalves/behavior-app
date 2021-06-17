import moment, { Moment } from "moment"
import { User } from "./user"

export class Consultation {
  id: number
  create_date: Moment
  concluded: boolean
  concluded_date: Moment
  owner: User

  constructor(props?: Partial<Consultation>) {
    const create_date = moment(props?.create_date, 'YYYY-MM-DDTHH:mm:ss')
    const concluded_date = moment(props?.concluded_date, 'YYYY-MM-DDTHH:mm:ss')

    const momentDates = { create_date, concluded_date }

    Object.assign(this, props, momentDates)
  }

  getDuration() {
    const daysDiff = this.concluded_date.diff(this.create_date, 'days')
    const diff = moment.utc(moment.duration(this.concluded_date.diff(this.create_date)).asMilliseconds())
    const days = daysDiff ? `${daysDiff}d` : ''
    const hours = diff.hours() ? `${diff.hours()}h` : ''
    const min = `${diff.minutes()}min`
    return `${days} ${hours} ${min}`
  }
}