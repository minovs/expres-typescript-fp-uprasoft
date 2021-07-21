export type userType = {
  id: string
  alfirm: string
  parent_id: string
  id_log: string
  roles: string
}
export type errType = {
  status?: number
  message: string
}
export type workersType = {
  id: number
  name: string
  parent_id: number
  id_log: number
  status: string | null
}
export type treeType = {
  id: number
  name: string
  parent_id: number
  id_log: number
  status: string | null
  children?: workersType[]
}
