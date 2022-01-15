import { LoadCustomerByEmailRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadCustomerByEmailPostgresRepository implements LoadCustomerByEmailRepository {
  async load (email: LoadCustomerByEmailRepository.Params): Promise<LoadCustomerByEmailRepository.Result> {
    const query = 'SELECT id_cliente as id FROM CLIENTES WHERE email_cliente = $1'
    const params = [email]
    const account = await PostgresHelper.execute(query, params)
    return PostgresHelper.mapperOneResult(account)
  }
}
