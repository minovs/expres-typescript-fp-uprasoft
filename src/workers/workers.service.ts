import { checTree, getWorkersForTree, getWorkers, getWorker } from './workers.model'
import { buildTree } from '../service/tree.service'

export const getAll = async (alfirm: string, parent_id: number, id_log: number, date: string) => {
  const dateSotr = new Intl.DateTimeFormat('ru-RU')
    .format(+date)
    .split('.')
    .reverse()
    .join('')

  try {
    let checResult = []
    checResult = await checTree(alfirm)
    if (checResult.length > 0) {
      if (parent_id === 0) {
        const data = await getWorkersForTree(alfirm, dateSotr)
        return await buildTree(data)
      } else if (id_log === 0) {
        return await getWorkers(alfirm, dateSotr, parent_id)
      } else {
        return await getWorker(alfirm, dateSotr, id_log)
      }
    } else if (id_log === 0) {
      return await getWorkers(alfirm, dateSotr, 0)
    } else {
      return await getWorker(alfirm, dateSotr, id_log)
    }
  } catch (e) {
    throw e
  }
}
