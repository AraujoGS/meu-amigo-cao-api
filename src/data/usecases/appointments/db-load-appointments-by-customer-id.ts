import { LoadAppointmentsByCustomerIdRepository } from '@/data/interfaces/db'
import { LoadAppointmentsByCustomerId } from '@/domain/usecases'

export class DbLoadAppointmentsByCustomerId implements LoadAppointmentsByCustomerId {
  constructor (private readonly loadAppointmentByCustomerIdRepository: LoadAppointmentsByCustomerIdRepository) {}
  async load (data: LoadAppointmentsByCustomerId.Params): Promise<LoadAppointmentsByCustomerId.Result> {
    const list = await this.loadAppointmentByCustomerIdRepository.load(data)
    return list
  }
}
