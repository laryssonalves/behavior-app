import * as SecureStore from 'expo-secure-store';

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
