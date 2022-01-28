import { CheckAppointmentByIdAndCustomerIdRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class CheckAppointmentByIdAndCustomerIdPostgresRepository implements CheckAppointmentByIdAndCustomerIdRepository {
  async check (data: CheckAppointmentByIdAndCustomerIdRepository.Params): Promise<CheckAppointmentByIdAndCustomerIdRepository.Result> {
    const { accountId, id } = data
    const query = `
      SELECT 
        a.id_agendamento as id 
      FROM CLIENTES c
      JOIN PETS p ON (c.id_cliente = p.id_cliente)
      JOIN AGENDAMENTOS a ON (p.id_pet = a.id_pet)
      WHERE a.id_agendamento = $1 AND c.id_cliente = $2
    `
    const params = [id, accountId]
    const result = await PostgresHelper.execute(query, params)
    return result?.rows.length === 1
  }
}
