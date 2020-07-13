import { stackBuilder } from './stack'
import { switchBuilder } from './switch'

export const navigatorBuilders = [stackBuilder, switchBuilder] as const
