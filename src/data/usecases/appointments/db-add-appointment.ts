import { CheckPetByIdAndCustomerIdRepository, CheckServiceByIdRepository } from '@/data/interfaces/db'
import { ActionResult } from '@/domain/models'
import { AddAppointment } from '@/domain/usecases'

export class DbAddAppointment implements AddAppointment {
  constructor (
    private readonly checkPetByIdAndCustomerIdRepository: CheckPetByIdAndCustomerIdRepository,
    private readonly checkServiceByIdRepository: CheckServiceByIdRepository
  ) {}

  async add (data: AddAppointment.Params): Promise<AddAppointment.Result> {
    const { petId, accountId, service } = data
    const petExists = await this.checkPetByIdAndCustomerIdRepository.check({ id: petId, accountId })
    if (!petExists) {
      return ActionResult.ERROR_PET_NOT_EXISTS
    }
    await this.checkServiceByIdRepository.check(service)
    return null
  }
}
