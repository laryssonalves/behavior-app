import { Member } from "./member";

export interface UserCredential {
  email: string;
  password: string;
}

export class User {
  id: number;
  email: string;
  name: string;
  photo: string
  person: Member
  group_role_id: number
  // permissions: Permission[]

  constructor(props?: Partial<User>) {
    Object.assign(this, props)
  }

  // hasPerms(codenames: string[]): boolean {
  //   return !!this.permissions.filter(perm => codenames.includes(perm.codename)).length
  // }

}

