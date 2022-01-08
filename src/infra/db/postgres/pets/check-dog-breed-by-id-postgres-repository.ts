import { CheckDogBreedByIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class CheckDogBreedByIdPostgresRepository implements CheckDogBreedByIdRepository {
  async check (id: CheckDogBreedByIdRepository.Params): Promise<CheckDogBreedByIdRepository.Result> {
    const query = 'SELECT id_raca FROM RACA_PET WHERE id_raca = $1'
    const params = [id]
    const result = await PostgresHelper.execute(query, params)
    return result?.rows.length === 1
  }
}
