import { AddPetRepository, CheckDogBreedByIdRepository, CheckDogTypeByIdRepository } from '@/data/interfaces/db'
import { AddPet } from '@/domain/usecases'
import { ActionResult } from '@/domain/models'

export class DbAddPet implements AddPet {
  constructor (
    private readonly checkDogBreedByIdRepository: CheckDogBreedByIdRepository,
    private readonly checkDogTypeByIdRepository: CheckDogTypeByIdRepository,
    private readonly addPetRepository: AddPetRepository
  ) {}

  async add (data: AddPet.Params): Promise<AddPet.Result> {
    const isValidDogBreed = await this.checkDogBreedByIdRepository.check(data.breed)
    if (!isValidDogBreed) return ActionResult.ERROR_INVALID_DOG_BREED
    await this.checkDogTypeByIdRepository.check(data.type)
    await this.addPetRepository.add(data)
    return ActionResult.SUCCESS
  }
}
