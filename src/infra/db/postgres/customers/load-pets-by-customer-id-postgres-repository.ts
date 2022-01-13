import { LoadPetsByCustomerIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadPetsByCustomerIdPostgresRepository implements LoadPetsByCustomerIdRepository {
  async load (id: LoadPetsByCustomerIdRepository.Params): Promise<LoadPetsByCustomerIdRepository.Result> {
    const query = `
      SELECT 
        id_pet as id,
        nome_pet as name,
        cor_pet as color,
        consideracoes as considerations,
        rp.nome_raca as breed,
        pp.titulo_porte as type
      FROM PETS p
      INNER JOIN RACA_PET rp ON (rp.id_raca = p.id_raca)
      INNER JOIN PORTE_PET pp ON (pp.id_porte = p.id_porte)
      WHERE p.id_cliente = $1
    `
    const params = [id]
    const account = await PostgresHelper.execute(query, params)
    return PostgresHelper.mapperManyResult(account)
  }
}
