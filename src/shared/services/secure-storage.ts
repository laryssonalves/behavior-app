import * as SecureStore from 'expo-secure-store'
import Company from '../../entities/company'
import { User } from '../../entities/user'

export const storeItem = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value)
}

export const retrieveItem = async (key: string): Promise<any> => {
  const value = await SecureStore.getItemAsync(key)

  return value ? JSON.parse(value) : null
}

export const clearItem = async (key: string) => {
  await SecureStore.deleteItemAsync(key)
}

export const storeLogin = async (token: any, user: User, company: Company) => {
  await storeItem('token', JSON.stringify(token))
  await storeItem('user', JSON.stringify(user))
  await storeItem('company', JSON.stringify(company))
}

export const clearToLogout = async () => {
  await clearItem('token')
  await clearItem('user')
  await clearItem('company')
}
