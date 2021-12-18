import { CheckAccountByEmailRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class CheckAccountByEmailPostgresRepository implements CheckAccountByEmailRepository {
  async check (email: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
    const query = 'SELECT id_cliente FROM CLIENTES WHERE email_cliente = $1'
    const params = [email]
    const result = await PostgresHelper.execute(query, params)
    return result?.rows.length === 1
  }
}
