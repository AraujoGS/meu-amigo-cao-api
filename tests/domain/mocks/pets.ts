import { AddPet } from '@/domain/usecases'
import faker from 'faker'
faker.locale = 'pt_BR'

export const mockAddPetParams = (): AddPet.Params => ({
  accountId: faker.datatype.uuid(),
  name: faker.name.findName(),
  breed: 29,
  color: faker.random.word(),
  type: 1,
  considerations: faker.random.words()
})
