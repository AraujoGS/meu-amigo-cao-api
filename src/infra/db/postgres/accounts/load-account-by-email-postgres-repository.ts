import { LoadAccountByEmailRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadAccountByEmailPostgresRepository implements LoadAccountByEmailRepository {
  async loadByEmail (email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
    const query = 'SELECT id_cliente as id, nome_cliente as name, senha_cliente as password FROM CLIENTES WHERE email_cliente = $1'
    const params = [email]
    const account = await PostgresHelper.execute(query, params)
    return account?.rows.length ? account.rows[0] : null
  }
}
