import { AddAddressRepository } from '@/data/interfaces/db'
import { IdentifierGenerator } from '@/data/interfaces/utils'
import { PostgresHelper } from '@/infra/db'

export class AddAddressPostgresRepository implements AddAddressRepository {
  constructor (
    private readonly identifierGenerator: IdentifierGenerator
  ) {}

  async add (data: AddAddressRepository.Params): Promise<void> {
    const query = `
    INSERT INTO ENDERECOS(
      id_endereco,
      id_cliente, 
      cep, 
      logradouro, 
      cidade, 
      bairro,
      numero,
      uf,
      complemento  
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `
    const { accountId, zipcode, address, city, district, number, state, complement } = data
    const id = this.identifierGenerator.generate()
    const params = [id, accountId, zipcode, address, city, district, number, state, complement]
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
