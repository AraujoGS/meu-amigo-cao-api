import { CheckDogTypeByIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class CheckDogTypeByIdPostgresRepository implements CheckDogTypeByIdRepository {
  async check (id: CheckDogTypeByIdRepository.Params): Promise<CheckDogTypeByIdRepository.Result> {
    const query = 'SELECT id_porte FROM PORTE_PET WHERE id_porte = $1'
    const params = [id]
    const result = await PostgresHelper.execute(query, params)
    return result?.rows.length === 1
  }
}
