import { LoadAccountByTokenRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadAccountByTokenPostgresRepository implements LoadAccountByTokenRepository {
  async load (token: LoadAccountByTokenRepository.Params): Promise<LoadAccountByTokenRepository.Result> {
    const query = 'SELECT id_cliente as id FROM CLIENTES WHERE token_acesso = $1'
    const params = [token]
    const account = await PostgresHelper.execute(query, params)
    return PostgresHelper.mapperOneResult(account)
  }
}
