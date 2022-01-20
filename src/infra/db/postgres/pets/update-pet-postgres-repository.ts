import { UpdatePetRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class UpdatePetPostgresRepository implements UpdatePetRepository {
  async update (data: UpdatePetRepository.Params): Promise<void> {
    const query = `
    UPDATE PETS SET
      nome_pet = $1, 
      cor_pet = $2, 
      consideracoes = $3, 
      id_raca = $4,
      id_porte = $5   
    WHERE id_pet = $6 AND id_cliente = $7
    `
    const { id, accountId, name, color, considerations, breed, type } = data
    const params = [name, color, considerations, breed, type, id, accountId]
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
