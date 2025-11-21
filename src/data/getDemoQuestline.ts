import { transformQuestLineData } from '../utils/transformQuestLineData'
import questlineRawData from './questlineData.json'

export function getDemoQuestlineDialogProps() {
  return transformQuestLineData(questlineRawData as any)
}
