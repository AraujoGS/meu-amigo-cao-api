import { CheckPetByIdAndCustomerIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class CheckPetByIdAndCustomerIdPostgresRepository implements CheckPetByIdAndCustomerIdRepository {
  async check (data: CheckPetByIdAndCustomerIdRepository.Params): Promise<CheckPetByIdAndCustomerIdRepository.Result> {
    const { id, accountId } = data
    const query = 'SELECT id_pet as id FROM PETS WHERE id_pet = $1 AND id_cliente = $2'
    const params = [id, accountId]
    const result = await PostgresHelper.execute(query, params)
    return result?.rows.length === 1
  }
}
