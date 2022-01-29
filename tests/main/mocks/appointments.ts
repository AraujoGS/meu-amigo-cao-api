import { PostgresHelper } from '@/infra/db'
import { v4 as uuid } from 'uuid'

export const mockAddAppointments = async (petId: string): Promise<string> => {
  const payload = {
    service: 3,
    date: new Date(),
    observations: 'orelhas bem sensíveis, necessário extremo cuidado com a região'
  }
  const id = uuid()
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
  const { date, observations, service } = payload
  const params = [id, date, observations, petId, service]
  await PostgresHelper.execute(query, params)
  return id
}
