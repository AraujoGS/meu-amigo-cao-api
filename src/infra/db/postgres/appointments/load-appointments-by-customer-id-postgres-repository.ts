import { LoadAppointmentsByCustomerIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class LoadAppointmentsByCustomerIdPostgresRepository implements LoadAppointmentsByCustomerIdRepository {
  async load (data: LoadAppointmentsByCustomerIdRepository.Params): Promise<LoadAppointmentsByCustomerIdRepository.Result> {
    const { accountId, offset = 1, limit = 10 } = data
    const query = `
      SELECT 
        a.id_agendamento as id,
        s.titulo_servico as service,
        a.data_agendamento as date,
        a.observacoes as observations,
        p.nome_pet as "petName",
        a.cancelamento as cancellation
      FROM CLIENTES c
        JOIN PETS p ON c.id_cliente = p.id_cliente
        JOIN AGENDAMENTOS a ON p.id_pet = a.id_pet
        JOIN SERVICOS s ON s.id_servico = a.id_servico
      WHERE c.id_cliente = $1
      LIMIT $2 OFFSET $3
    `
    const params = [accountId, limit, (offset - 1)]
    const result = await PostgresHelper.execute(query, params)
    return PostgresHelper.mapperManyResult(result)
  }
}
