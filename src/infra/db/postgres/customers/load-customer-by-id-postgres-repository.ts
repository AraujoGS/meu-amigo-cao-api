import { LoadCustomerByIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadCustomerByIdPostgresRepository implements LoadCustomerByIdRepository {
  async load (id: LoadCustomerByIdRepository.Params): Promise<LoadCustomerByIdRepository.Result> {
    const query = `
      SELECT 
        id_cliente as id, 
        nome_cliente as name,        
        email_cliente as email, 
        telefone_cliente as phone,
        data_nascimento_cliente as "birthDate"
      FROM CLIENTES WHERE id_cliente = $1
    `
    const params = [id]
    const account = await PostgresHelper.execute(query, params)
    return PostgresHelper.mapperOneResult(account)
  }
}
