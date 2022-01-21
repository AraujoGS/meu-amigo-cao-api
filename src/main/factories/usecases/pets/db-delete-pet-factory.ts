import { DbDeletePet } from '@/data/usecases'
import { DeletePet } from '@/domain/usecases'
import { CheckPetByIdAndCustomerIdPostgresRepository, DeletePetPostgresRepository } from '@/infra/db'

export const makeDbDeletePet = (): DeletePet => {
  const checkPetByIdAndCustomerIdPostgresRepository = new CheckPetByIdAndCustomerIdPostgresRepository()
  const deletePetPostgresRepository = new DeletePetPostgresRepository()
  return new DbDeletePet(checkPetByIdAndCustomerIdPostgresRepository, deletePetPostgresRepository)
}
