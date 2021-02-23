import moment, { Moment } from "moment"

export class Student {
  id: number
  name: string
  owner: number
  company: number
  age: number
  genre: number
  birth_date: Moment
  first_avaliation_date: Moment

  static createFromJSON(data: any): Student {
    birth_date = moment(data.birth_date, 'YYYY-MM-DD')

    return Object.assign(new Student(), data, { birth_date })
  }

  getPayload() {
    return {
      ...this,
      birth_date: this.birth_date.format('YYYY-MM-DD')
    }
  }
}