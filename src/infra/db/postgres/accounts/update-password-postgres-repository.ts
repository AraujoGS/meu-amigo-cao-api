import { UpdatePasswordRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class UpdatePasswordPostgresRepository implements UpdatePasswordRepository {
  async updatePassword (data: UpdatePasswordRepository.Params): Promise<void> {
    const query = 'UPDATE CLIENTES SET senha_cliente = $1 WHERE email_cliente = $2'
    const params = [data.password, data.email]
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
