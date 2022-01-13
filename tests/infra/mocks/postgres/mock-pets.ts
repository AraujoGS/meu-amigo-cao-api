import { AddPetPostgresRepository } from '@/infra/db'
import { mockAddPetParams } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy } from '@/tests/infra/mocks'

type PetsModel = {
  id: string
  accountId: string
  name: string
  breed: string
  color: string
  type: string
  considerations: string
}

export const mockPets = async (id: string): Promise<PetsModel> => {
  const params = mockAddPetParams()
  params.accountId = id
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const addPetPostgresRepository = new AddPetPostgresRepository(identifierGeneratorSpy)
  await addPetPostgresRepository.add(params)
  return {
    ...params,
    breed: 'Maltês',
    type: 'MINI',
    id: identifierGeneratorSpy.result
  }
}
