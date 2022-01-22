import { CheckPetByIdAndCustomerIdRepository } from '@/data/interfaces/db'
import { AddAppointment } from '@/domain/usecases'

export class DbAddAppointment implements AddAppointment {
  constructor (
    private readonly checkPetByIdAndCustomerIdRepository: CheckPetByIdAndCustomerIdRepository
  ) {}

  async add (data: AddAppointment.Params): Promise<AddAppointment.Result> {
    const { petId, accountId } = data
    await this.checkPetByIdAndCustomerIdRepository.check({ id: petId, accountId })
    return null
  }
}
