import { DbAddPet } from '@/data/usecases'
import { AddPet } from '@/domain/usecases'
import { AddPetPostgresRepository, CheckDogBreedByIdPostgresRepository, CheckDogTypeByIdPostgresRepository } from '@/infra/db'
import { UuidAdapter } from '@/infra/utils'

export const makeDbAddPet = (): AddPet => {
  const checkDogBreedByIdPostgresRepository = new CheckDogBreedByIdPostgresRepository()
  const checkDogTypeByIdPostgresRepository = new CheckDogTypeByIdPostgresRepository()
  const uuidAdapter = new UuidAdapter()
  const addPetPostgresRepository = new AddPetPostgresRepository(uuidAdapter)
  return new DbAddPet(checkDogBreedByIdPostgresRepository, checkDogTypeByIdPostgresRepository, addPetPostgresRepository)
}
