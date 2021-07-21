import { getReport } from './reports.model'

export const getOne = async (alias: string, date: string, id: string) => {
  const dateSotr = new Intl.DateTimeFormat('ru-RU')
    .format(+date)
    .split('.')
    .reverse()
    .join('')
  try {
    return await getReport(alias, dateSotr, id)
  } catch (e) {
    throw e
  }
}
