import { transformQuestLineData } from '../utils/transformQuestLineData'
import questlineRawDataUnknown from './questlineData.json'

export function getDemoQuestlineDialogProps() {
  return transformQuestLineData(questlineRawDataUnknown as Record<string, unknown>)
}
