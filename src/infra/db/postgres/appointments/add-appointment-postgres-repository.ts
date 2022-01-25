import { AddAppointmentRepository } from '@/data/interfaces/db'
import { IdentifierGenerator } from '@/data/interfaces/utils'
import { PostgresHelper } from '@/infra/db'

export class AddAppointmentPostgresRepository implements AddAppointmentRepository {
  constructor (
    private readonly identifierGenerator: IdentifierGenerator
  ) {}

  async add (data: AddAppointmentRepository.Params): Promise<void> {
    const query = `
    INSERT INTO AGENDAMENTOS(
      id_agendamento,
      data_agendamento, 
      observacoes, 
      id_pet, 
      id_servico 
    )
    VALUES ($1,$2,$3,$4,$5)
    `
    const { date, observations, petId, service } = data
    const id = this.identifierGenerator.generate()
    const params = [id, date, observations, petId, service]
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
