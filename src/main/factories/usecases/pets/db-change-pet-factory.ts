import { DbChangePet } from '@/data/usecases'
import { ChangePet } from '@/domain/usecases'
import { CheckPetByIdAndCustomerIdPostgresRepository, UpdatePetPostgresRepository } from '@/infra/db'

export const makeDbChangePet = (): ChangePet => {
  const checkPetByIdAndCustomerIdPostgresRepository = new CheckPetByIdAndCustomerIdPostgresRepository()
  const updatePetPostgresRepository = new UpdatePetPostgresRepository()
  return new DbChangePet(checkPetByIdAndCustomerIdPostgresRepository, updatePetPostgresRepository)
}
