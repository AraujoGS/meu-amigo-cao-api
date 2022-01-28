import {
  CheckServiceByIdRepository,
  AddAppointmentRepository,
  LoadAppointmentsByCustomerIdRepository,
  CheckAppointmentByIdAndCustomerIdRepository
} from '@/data/interfaces/db'
import faker from 'faker'

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

export class LoadAppointmentsByCustomerIdRepositorySpy implements LoadAppointmentsByCustomerIdRepository {
  data: LoadAppointmentsByCustomerIdRepository.Params
  result = [{
    id: faker.datatype.uuid(),
    service: faker.random.word(),
    date: faker.date.future(),
    observations: faker.random.words(),
    petName: faker.name.findName(),
    cancellation: faker.datatype.boolean()
  }]

  async load (data: LoadAppointmentsByCustomerIdRepository.Params): Promise<LoadAppointmentsByCustomerIdRepository.Result> {
    this.data = data
    return this.result
  }
}

export class CheckAppointmentByIdAndCustomerIdRepositorySpy implements CheckAppointmentByIdAndCustomerIdRepository {
  data: CheckAppointmentByIdAndCustomerIdRepository.Params
  result = true
  async check (data: CheckAppointmentByIdAndCustomerIdRepository.Params): Promise<CheckAppointmentByIdAndCustomerIdRepository.Result> {
    this.data = data
    return this.result
  }
}
