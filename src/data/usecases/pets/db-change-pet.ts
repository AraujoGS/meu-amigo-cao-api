import { ChangePet } from '@/domain/usecases'
import { CheckPetByIdAndCustomerIdRepository, UpdatePetRepository } from '@/data/interfaces/db'

export class DbChangePet implements ChangePet {
  constructor (
    private readonly checkPetByIdAndCustomerIdRepository: CheckPetByIdAndCustomerIdRepository,
    private readonly updatePetRepository: UpdatePetRepository
  ) {}

  async change (data: ChangePet.Params): Promise<ChangePet.Result> {
    const { id, accountId } = data
    const isValid = await this.checkPetByIdAndCustomerIdRepository.check({ id, accountId })
    if (isValid) {
      await this.updatePetRepository.update(data)
      return true
    }
    return false
  }
}
