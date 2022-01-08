import { AddPetRepository, CheckDogBreedByIdRepository } from '@/data/interfaces/db'
import { AddPet } from '@/domain/usecases'
import { ActionResult } from '@/domain/models'

export class DbAddPet implements AddPet {
  constructor (
    private readonly checkDogBreedByIdRepository: CheckDogBreedByIdRepository,
    private readonly addPetRepository: AddPetRepository
  ) {}

  async add (data: AddPet.Params): Promise<AddPet.Result> {
    const isValidDobBreed = await this.checkDogBreedByIdRepository.check(data.breed)
    if (!isValidDobBreed) return ActionResult.ERROR_INVALID_DOG_BREED
    await this.addPetRepository.add(data)
    return ActionResult.SUCCESS
  }
}
