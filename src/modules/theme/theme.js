import * as changeKeys from 'change-case/keys'
import { isDarkMode } from '@app/utils/browser'
import config from './config'

const theme = isDarkMode
  ? changeKeys.camelCase(config?.dark)
  : changeKeys.camelCase(config?.light)

export default theme
