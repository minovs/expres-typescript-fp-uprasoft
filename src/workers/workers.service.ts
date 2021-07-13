import { checTree, getWorkersForTree, getWorkers, getWorker } from './workers.model'
import { buildTree } from '../app.service'

export const getAll = async (date: string) => {
  const alias = 'upk'
  const userGroup: string = '0'
  const userSingl: string = '0'

  const dateSotr = new Intl.DateTimeFormat('ru-RU')
    .format(+date)
    .split('.')
    .reverse()
    .join('')

  let checResult = []
  try {
    checResult = await checTree(alias)
  } catch (e) {
    console.log(e)
  }

  if (checResult.length > 0) {
    if (userGroup === '0') {
      try {
        const data = await getWorkersForTree(alias, dateSotr)
        return await buildTree(data)
      } catch (e) {}
    } else if (userSingl === '0') {
      try {
        return await getWorkers(alias, dateSotr, userGroup)
      } catch (e) {}
    } else {
      try {
        return await getWorker(alias, dateSotr, userSingl)
      } catch (e) {}
    }
  } else if (userSingl === '0') {
    try {
      return await getWorkers(alias, dateSotr, '0')
    } catch (e) {}
  } else {
    try {
      return await getWorker(alias, dateSotr, userSingl)
    } catch (e) {}
  }
}
