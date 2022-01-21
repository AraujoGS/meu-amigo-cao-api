import { CheckPetByIdAndCustomerIdRepository } from '@/data/interfaces/db'
import { DeletePet } from '@/domain/usecases'

export class DbDeletePet implements DeletePet {
  constructor (
    private readonly checkPetByIdAndCustomerIdRepository: CheckPetByIdAndCustomerIdRepository
  ) {}

  async delete (data: DeletePet.Params): Promise<DeletePet.Result> {
    await this.checkPetByIdAndCustomerIdRepository.check(data)
    return true
  }
}
