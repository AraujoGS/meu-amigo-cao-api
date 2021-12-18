import { CheckAccountByPhoneRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class CheckAccountByPhonePostgresRepository implements CheckAccountByPhoneRepository {
  async check (phone: CheckAccountByPhoneRepository.Params): Promise<CheckAccountByPhoneRepository.Result> {
    const query = 'SELECT id_cliente FROM CLIENTES WHERE telefone_cliente = $1'
    const params = [phone]
    const result = await PostgresHelper.execute(query, params)
    return result?.rows.length === 1
  }
}
