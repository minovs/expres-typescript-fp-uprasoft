import { workersType, treeType } from '../types/types'

export const buildTree = async (data: workersType[]) => {
  const map = new Map<number, treeType>(data.map((item) => [item.id, item]))
  map.forEach((item) => {
    if (map.has(item.parent_id)) {
      const parentID = map.get(item.parent_id)
      parentID.children = [...(parentID.children || []), item]
    }
  })
  return [...map.values()].filter((item) => !item.parent_id)
}
