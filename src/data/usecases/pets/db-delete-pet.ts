import { CheckPetByIdAndCustomerIdRepository, DeletePetRepository } from '@/data/interfaces/db'
import { DeletePet } from '@/domain/usecases'

export class DbDeletePet implements DeletePet {
  constructor (
    private readonly checkPetByIdAndCustomerIdRepository: CheckPetByIdAndCustomerIdRepository,
    private readonly deletePetRepository: DeletePetRepository
  ) {}

  async delete (data: DeletePet.Params): Promise<DeletePet.Result> {
    const isValid = await this.checkPetByIdAndCustomerIdRepository.check(data)
    if (isValid) {
      await this.deletePetRepository.delete(data)
    }
    return false
  }
}
