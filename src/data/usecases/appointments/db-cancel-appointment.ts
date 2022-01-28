import { CancelAppointmentRepository, CheckAppointmentByIdAndCustomerIdRepository } from '@/data/interfaces/db'
import { CancelAppointment } from '@/domain/usecases'

export class DbCancelAppointment implements CancelAppointment {
  constructor (
    private readonly checkAppointmentByIdAndCustomerIdRepository: CheckAppointmentByIdAndCustomerIdRepository,
    private readonly cancelAppointmentRepository: CancelAppointmentRepository
  ) {}

  async cancel (data: CancelAppointment.Params): Promise<CancelAppointment.Result> {
    const isValid = await this.checkAppointmentByIdAndCustomerIdRepository.check(data)
    if (isValid) {
      await this.cancelAppointmentRepository.cancel(data)
      return true
    }
    return false
  }
}
