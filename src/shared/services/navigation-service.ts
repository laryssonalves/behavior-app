import { CommonActions } from '@react-navigation/native'

let navigator: any

function setTopLevelNavigator(navigatorRef: any) {
  navigator = navigatorRef
}

function navigate(name: string, params?: object) {
  navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    })
  )
}

// add other navigation functions that you need and export them

export { navigate, setTopLevelNavigator }
