import { Client, Pool, QueryResult } from 'pg'

export const PostgresHelper = {
  client: null as Pool,
  async connect (db: Pool | Client): Promise<void> {
    this.client = db
  },
  async disconnect (): Promise<void> {
    this.client.end()
    this.client = null
  },
  async execute (sql: string, params: any[] = []): Promise<QueryResult> {
    return this.client.query(sql, params)
  },
  async beginTransaction (): Promise<QueryResult> {
    return this.client.query('BEGIN')
  },
  async commitTransaction (): Promise<QueryResult> {
    return this.client.query('COMMIT')
  },
  async rollbackTransaction (): Promise<QueryResult> {
    return this.client.query('ROLLBACK')
  },
  mapperOneResult (result: QueryResult): any {
    return result?.rows.length ? result.rows[0] : null
  },
  mapperManyResult (result: QueryResult): any {
    return result?.rows.length ? result.rows : []
  }
}

export const PostgresClient = (uri: string): Pool => {
  return new Pool({ connectionString: uri })
}
