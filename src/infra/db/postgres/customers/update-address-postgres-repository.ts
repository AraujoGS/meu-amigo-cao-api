import { UpdateAddressRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class UpdateAddressPostgresRepository implements UpdateAddressRepository {
  async update (data: UpdateAddressRepository.Params): Promise<void> {
    const query = `
    UPDATE ENDERECOS SET
      cep = $1, 
      logradouro = $2, 
      cidade = $3, 
      bairro = $4,
      numero = $5,
      uf = $6,
      complemento = $7    
    WHERE id_endereco = $8 AND id_cliente = $9
    `
    const { id, accountId, zipcode, address, city, district, number, state, complement } = data
    const params = [zipcode, address, city, district, number, state, complement, id, accountId]
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
