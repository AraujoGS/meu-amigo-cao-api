import { LoadAddressByCustomerIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadAddressByCustomerIdPostgresRepository implements LoadAddressByCustomerIdRepository {
  async load (id: LoadAddressByCustomerIdRepository.Params): Promise<LoadAddressByCustomerIdRepository.Result> {
    const query = `
      SELECT 
        id_endereco as id,
        cep as zipcode,
        logradouro as address,
        numero as number,
        bairro as district,
        complemento as complement,
        cidade as city,
        uf as state
      FROM ENDERECOS
      WHERE id_cliente = $1
    `
    const params = [id]
    const account = await PostgresHelper.execute(query, params)
    return PostgresHelper.mapperManyResult(account)
  }
}
