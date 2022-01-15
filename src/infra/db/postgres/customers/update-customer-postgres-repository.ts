import { UpdateCustomerRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class UpdateCustomerPostgresRepository implements UpdateCustomerRepository {
  async update (data: UpdateCustomerRepository.Params): Promise<void> {
    const { name, email, phone, birthDate, id } = data
    const query = `
      UPDATE CLIENTES SET 
        nome_cliente = $1,
        email_cliente = $2,
        telefone_cliente = $3,
        data_nascimento_cliente = $4
      WHERE id_cliente = $5
    `
    const params = [name, email, phone, birthDate, id]
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
