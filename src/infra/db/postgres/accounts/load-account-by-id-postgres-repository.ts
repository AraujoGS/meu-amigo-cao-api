import { LoadAccountByIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadAccountByIdPostgresRepository implements LoadAccountByIdRepository {
  async loadById (id: LoadAccountByIdRepository.Params): Promise<LoadAccountByIdRepository.Result> {
    const query = 'SELECT email_cliente as email, senha_cliente as password FROM CLIENTES WHERE id_cliente = $1'
    const params = [id]
    const account = await PostgresHelper.execute(query, params)
    return PostgresHelper.mapperOneResult(account)
  }
}
