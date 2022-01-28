import { CheckAppointmentByIdAndCustomerIdRepository } from '@/data/interfaces/db'
import { CancelAppointment } from '@/domain/usecases'

export class DbCancelAppointment implements CancelAppointment {
  constructor (
    private readonly checkAppointmentByIdAndCustomerIdRepository: CheckAppointmentByIdAndCustomerIdRepository
  ) {}

  async cancel (data: CancelAppointment.Params): Promise<CancelAppointment.Result> {
    const isValid = await this.checkAppointmentByIdAndCustomerIdRepository.check(data)
    return isValid
  }
}
