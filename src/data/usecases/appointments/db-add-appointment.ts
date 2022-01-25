import { AddAppointmentRepository, CheckPetByIdAndCustomerIdRepository, CheckServiceByIdRepository } from '@/data/interfaces/db'
import { ActionResult } from '@/domain/models'
import { AddAppointment } from '@/domain/usecases'

export class DbAddAppointment implements AddAppointment {
  constructor (
    private readonly checkPetByIdAndCustomerIdRepository: CheckPetByIdAndCustomerIdRepository,
    private readonly checkServiceByIdRepository: CheckServiceByIdRepository,
    private readonly addAppointmentRepository: AddAppointmentRepository
  ) {}

  async add (data: AddAppointment.Params): Promise<AddAppointment.Result> {
    const { petId, accountId, service, observations, date } = data
    const petExists = await this.checkPetByIdAndCustomerIdRepository.check({ id: petId, accountId })
    if (!petExists) {
      return ActionResult.ERROR_PET_NOT_EXISTS
    }
    const validService = await this.checkServiceByIdRepository.check(service)
    if (!validService) {
      return ActionResult.ERROR_INVALID_SERVICE
    }
    await this.addAppointmentRepository.add({
      petId,
      service,
      observations,
      date
    })
    return ActionResult.SUCCESS
  }
}
