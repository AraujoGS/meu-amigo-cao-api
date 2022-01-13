import { AddAddressPostgresRepository } from '@/infra/db'
import { mockAddAddressParams } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy } from '@/tests/infra/mocks'

type AddressModel = {
  id: string
  accountId: string
  zipcode: string
  address: string
  number: number
  district: string
  city: string
  state: string
  complement?: string
}

export const mockAddress = async (id: string): Promise<AddressModel> => {
  const params = mockAddAddressParams()
  params.accountId = id
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const addAddressPostgresRepository = new AddAddressPostgresRepository(identifierGeneratorSpy)
  await addAddressPostgresRepository.add(params)
  return {
    ...params,
    id: identifierGeneratorSpy.result
  }
}
