import { CancelAppointmentRepository } from '@/data/interfaces/db'
import { PostgresHelper } from '@/infra/db'

export class CancelAppointmentPostgresRepository implements CancelAppointmentRepository {
  async cancel (id: CancelAppointmentRepository.Params): Promise<void> {
    const query = 'UPDATE AGENDAMENTOS SET cancelamento = true WHERE id_agendamento = $1'
    const params = [id]
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
