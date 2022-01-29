import { AddAppointment, LoadAppointmentsByCustomerId, CancelAppointment } from '@/domain/usecases'
import { ActionResult } from '@/domain/models'
import faker from 'faker'

export class AddAppointmentSpy implements AddAppointment {
  data: AddAppointment.Params
  result = ActionResult.SUCCESS
  async add (data: AddAppointment.Params): Promise<AddAppointment.Result> {
    this.data = data
    return this.result
  }
}

export class LoadAppointmentsByCustomerIdSpy implements LoadAppointmentsByCustomerId {
  data: LoadAppointmentsByCustomerId.Params
  result = [{
    id: faker.datatype.uuid(),
    service: faker.random.word(),
    date: faker.date.future(),
    observations: faker.random.words(),
    petName: faker.name.findName(),
    cancellation: faker.datatype.boolean()
  }]

  async load (data: LoadAppointmentsByCustomerId.Params): Promise<LoadAppointmentsByCustomerId.Result> {
    this.data = data
    return this.result
  }
}

export class CancelAppointmentSpy implements CancelAppointment {
  data: CancelAppointment.Params
  result = true
  async cancel (data: CancelAppointment.Params): Promise<CancelAppointment.Result> {
    this.data = data
    return this.result
  }
}
