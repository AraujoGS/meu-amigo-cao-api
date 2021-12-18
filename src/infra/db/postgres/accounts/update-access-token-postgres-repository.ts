import { UpdateAccessTokenRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class UpdateAccessTokenPostgresRepository implements UpdateAccessTokenRepository {
  async updateAccessToken (data: UpdateAccessTokenRepository.Params): Promise<void> {
    const query = 'UPDATE CLIENTES SET token_acesso = $1 WHERE id_cliente = $2'
    const params = [data.accessToken, data.id]
    await PostgresHelper.execute(query, params)
  }
}
