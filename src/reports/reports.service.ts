import ReportsModel from './reports.model'
/*import AppService from '../app.service'*/

export const getOne = async (date: string, id: string) => {
  const dateSotr = new Intl.DateTimeFormat('ru-RU')
    .format(+date)
    .split('.')
    .reverse()
    .join('')
  const alias = 'upk'

  try {
    return await ReportsModel.getReport(alias, dateSotr, id)
  } catch (e) {}
}
