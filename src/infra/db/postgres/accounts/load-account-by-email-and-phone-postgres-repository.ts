import { LoadAccountByEmailAndPhoneRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadAccountByEmailAndPhonePostgresRepository implements LoadAccountByEmailAndPhoneRepository {
  async load (data: LoadAccountByEmailAndPhoneRepository.Params): Promise<LoadAccountByEmailAndPhoneRepository.Result> {
    const query = 'SELECT nome_cliente as name, email_cliente as email FROM CLIENTES WHERE email_cliente = $1 AND telefone_cliente = $2'
    const { email, phone } = data
    const params = [email, phone]
    const account = await PostgresHelper.execute(query, params)
    return PostgresHelper.mapperOneResult(account)
  }
}
