import { PostgresHelper } from '@/infra/db'
import { v4 as uuid } from 'uuid'

export const mockAddPets = async (accountId: string): Promise<string> => {
  const payload = {
    name: 'Nick',
    breed: 16,
    color: 'preta',
    type: 2,
    considerations: 'orelhas bem sensíveis, necessário extremo cuidado com a região'
  }
  const id = uuid()
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
  const { name, color, considerations, breed, type } = payload
  const params = [id, name, color, considerations, accountId, breed, type]
  await PostgresHelper.execute(query, params)
  return id
}
