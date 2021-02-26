import { StyleSheet } from 'react-native'

import { SECONDARY_COLOR } from '../colors'

const basePickerStyle = StyleSheet.create({
    placeholder: {
      fontSize: 16,
      fontFamily: 'Chai-Regular',
      color: SECONDARY_COLOR
    },
    inputAndroid: {
      flex: 1,
      fontSize: 16,
      color: SECONDARY_COLOR,
      fontFamily: 'Chai-Regular',
      marginLeft: 20
    }
  })
  
  const pickerStyleInvalid = StyleSheet.create({
    ...basePickerStyle,
  
    inputAndroidContainer: {
      height: 50,
      borderColor: 'red',
      borderWidth: 2,
      borderRadius: 24,
      marginBottom: 8
    },
  })
  
  const pickerStyleValid = StyleSheet.create({
    ...basePickerStyle,
  
    inputAndroidContainer: {
      height: 50,
      borderColor: SECONDARY_COLOR,
      borderWidth: 2,
      borderRadius: 24,
      marginBottom: 8
    },
  })


  export {pickerStyleInvalid, pickerStyleValid}