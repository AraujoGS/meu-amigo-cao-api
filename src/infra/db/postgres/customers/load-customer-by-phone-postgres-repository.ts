import { LoadCustomerByPhoneRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadCustomerByPhonePostgresRepository implements LoadCustomerByPhoneRepository {
  async load (phone: LoadCustomerByPhoneRepository.Params): Promise<LoadCustomerByPhoneRepository.Result> {
    const query = 'SELECT id_cliente as id FROM CLIENTES WHERE telefone_cliente = $1'
    const params = [phone]
    const account = await PostgresHelper.execute(query, params)
    return PostgresHelper.mapperOneResult(account)
  }
}
