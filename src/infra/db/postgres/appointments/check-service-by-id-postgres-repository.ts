import { CheckServiceByIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class CheckServiceByIdPostgresRepository implements CheckServiceByIdRepository {
  async check (id: CheckServiceByIdRepository.Params): Promise<CheckServiceByIdRepository.Result> {
    const query = 'SELECT id_servico as id FROM SERVICOS WHERE id_servico = $1'
    const params = [id]
    const result = await PostgresHelper.execute(query, params)
    return result?.rows.length === 1
  }
}
