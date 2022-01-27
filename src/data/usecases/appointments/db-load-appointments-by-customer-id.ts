import { LoadAppointmentsByCustomerIdRepository } from '@/data/interfaces/db'
import { LoadAppointmentsByCustomerId } from '@/domain/usecases'

export class DbLoadAppointmentsByCustomerId implements LoadAppointmentsByCustomerId {
  constructor (private readonly loadAppointmentByCustomerIdRepository: LoadAppointmentsByCustomerIdRepository) {}
  async load (data: LoadAppointmentsByCustomerId.Params): Promise<LoadAppointmentsByCustomerId.Result> {
    await this.loadAppointmentByCustomerIdRepository.load(data)
    return null
  }
}
