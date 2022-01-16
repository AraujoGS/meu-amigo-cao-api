import { CheckAddressByIdAndCustomerIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class CheckAddressByIdAndCustomerIdPostgresRepository implements CheckAddressByIdAndCustomerIdRepository {
  async check (data: CheckAddressByIdAndCustomerIdRepository.Params): Promise<CheckAddressByIdAndCustomerIdRepository.Result> {
    const { id, accountId } = data
    const query = 'SELECT id_endereco as id FROM ENDERECOS WHERE id_endereco = $1 AND id_cliente = $2'
    const params = [id, accountId]
    const result = await PostgresHelper.execute(query, params)
    return result?.rows.length === 1
  }
}
