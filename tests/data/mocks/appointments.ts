import { CheckServiceByIdRepository, AddAppointmentRepository } from '@/data/interfaces/db'

export class CheckServiceByIdRepositorySpy implements CheckServiceByIdRepository {
  id: CheckServiceByIdRepository.Params
  result = true
  async check (id: CheckServiceByIdRepository.Params): Promise<CheckServiceByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class AddAppointmentRepositorySpy implements AddAppointmentRepository {
  data: AddAppointmentRepository.Params
  async add (data: AddAppointmentRepository.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}
