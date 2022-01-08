import { LoadAccountByTokenRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadAccountByTokenPostgresRepository implements LoadAccountByTokenRepository {
  async load (data: LoadAccountByTokenRepository.Params): Promise<LoadAccountByTokenRepository.Result> {
    const query = 'SELECT id_cliente as id FROM CLIENTES WHERE token_acesso = $1 AND (permissao IS NULL OR permissao = $2)'
    const params = [data.token, data.role]
    const account = await PostgresHelper.execute(query, params)
    return PostgresHelper.mapperOneResult(account)
  }
}
