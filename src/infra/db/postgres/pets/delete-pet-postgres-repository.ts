import { DeletePetRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class DeletePetPostgresRepository implements DeletePetRepository {
  async delete (data: DeletePetRepository.Params): Promise<void> {
    const query = 'DELETE FROM PETS WHERE id_pet = $1 AND id_cliente = $2'
    const { id, accountId } = data
    const params = [id, accountId]
    try {
      await PostgresHelper.beginTransaction()
      await PostgresHelper.execute(query, params)
      await PostgresHelper.commitTransaction()
    } catch (error) {
      await PostgresHelper.rollbackTransaction()
      throw error
    }
  }
}
