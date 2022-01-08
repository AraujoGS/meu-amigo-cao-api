import { AddPetRepository } from '@/data/interfaces/db'
import { IdentifierGenerator } from '@/data/interfaces/utils'
import { PostgresHelper } from '@/infra/db'

export class AddPetPostgresRepository implements AddPetRepository {
  constructor (
    private readonly identifierGenerator: IdentifierGenerator
  ) {}

  async add (data: AddPetRepository.Params): Promise<void> {
    const query = `
    INSERT INTO PETS(
      id_pet,
      nome_pet, 
      cor_pet, 
      consideracoes, 
      id_cliente,
      id_raca,
      id_porte
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    `
    const { name, color, considerations, accountId, breed, type } = data
    const id = this.identifierGenerator.generate()
    const params = [id, name, color, considerations, accountId, breed, type]
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
