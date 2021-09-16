import { Colors } from 'react-native-paper'
import { SECONDARY_TEXT_COLOR } from './colors'
import { ResultTypeChoice } from './entities/choices'

const resulTypeIconMap = {
  [ResultTypeChoice.WRONG]: 'minus',
  [ResultTypeChoice.CORRECT_WITH_HELP]: 'plus',
  [ResultTypeChoice.INDEPENDENT]: 'plus-circle',
  [ResultTypeChoice.NOT_APPLIED]: '',
}

const resulTypeColorMap = {
  [ResultTypeChoice.WRONG]: Colors.red500,
  [ResultTypeChoice.CORRECT_WITH_HELP]: Colors.green500,
  [ResultTypeChoice.INDEPENDENT]: Colors.blue500,
  [ResultTypeChoice.NOT_APPLIED]: SECONDARY_TEXT_COLOR,
}

export { resulTypeIconMap, resulTypeColorMap }
