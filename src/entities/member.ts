import { CorePerson } from './core-person'

export class Member extends CorePerson {
  company: number

  constructor(props?: Partial<Member>) {
    super()
    Object.assign(this, props)
  }
}
