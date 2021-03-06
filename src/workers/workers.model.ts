import { connectDb } from '../database'
import { RowDataPacket } from 'mysql2'

export const checTree = async (alias: string): Promise<RowDataPacket[string]> => {
  const table = `${alias}sotrs`
  const msQuery = `SELECT id FROM ${table} WHERE parent_id >0 LIMIT 1 `
  try {
    const connection = await connectDb()
    const [rows] = await connection.execute(msQuery)
    return rows
  } catch (e) {
    throw e
  }
}

export const getWorkersForTree = async (alias: string, date: string): Promise<RowDataPacket[string]> => {
  const tableSotrs = `${alias}sotrs`
  const tableAnalisis = `${alias}analisis`
  const tableDist = `${alias}dist`
  const msQuery = `SELECT a.id, a.name, a.parent_id, a.id_log, c.status FROM ${tableSotrs} 
    a LEFT JOIN (SELECT b.id, "activ" AS status FROM ${tableSotrs} 
    b WHERE id_log in (SELECT id_log FROM ${tableAnalisis} WHERE date=? 
      UNION SELECT id_log FROM ${tableDist} 
      WHERE date=?)) c ON a.id = c.id`
  try {
    const connection = await connectDb()
    const [rows] = await connection.execute(msQuery, [date, date])
    return rows
  } catch (e) {
    throw e
  }
}

export const getWorkers = async (alias: string, date: string, userGroup: number): Promise<RowDataPacket[string]> => {
  const tableSotrs = `${alias}sotrs`
  const tableAnalisis = `${alias}analisis`
  const tableDist = `${alias}dist`
  const msQuery = `SELECT a.id, a.name, a.parent_id, a.id_log, c.status FROM ${tableSotrs}
  a LEFT JOIN (SELECT b.id, "activ" AS status FROM ${tableSotrs} 
  b WHERE id_log in (SELECT id_log FROM ${tableAnalisis} WHERE date=? 
    UNION SELECT id_log FROM ${tableDist} 
    WHERE date=?)) c ON a.id = c.id WHERE parent_id = ?`
  try {
    const connection = await connectDb()
    const [rows] = await connection.execute(msQuery, [date, date, userGroup])
    return rows
  } catch (e) {
    throw e
  }
}

export const getWorker = async (alias: string, date: string, userSingl: number): Promise<RowDataPacket[string]> => {
  const tableSotrs = `${alias}sotrs`
  const tableAnalisis = `${alias}analisis`
  const tableDist = `${alias}dist`
  const msQuery = `SELECT a.id, a.name, a.id_log, c.status FROM ${tableSotrs}
  a LEFT JOIN (SELECT b.id, "activ" AS status FROM ${tableSotrs} 
  b WHERE id_log in (SELECT id_log FROM ${tableAnalisis} WHERE date=? 
    AND id_log = ? 
    UNION SELECT id_log FROM ${tableDist} 
    WHERE date=? 
    AND id_log = ? )) c ON a.id = c.id WHERE id_log = ? limit 1`
  try {
    const connection = await connectDb()
    const [rows] = await connection.execute(msQuery, [date, userSingl, date, userSingl, userSingl])
    return rows
  } catch (e) {
    throw e
  }
}
