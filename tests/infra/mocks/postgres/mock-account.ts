import { AddAccountPostgresRepository, UpdateAccessTokenPostgresRepository } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy } from '@/tests/infra/mocks'
import faker from 'faker'

type AccountModel = {
  id: string
  name: string
  email: string
  password: string
  phone: string
  birthDate: Date
}

export const mockAccount = async (): Promise<AccountModel> => {
  const params = mockAddAccountParams()
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const addAccountPostgresRepository = new AddAccountPostgresRepository(identifierGeneratorSpy)
  await addAccountPostgresRepository.add(params)
  return {
    ...params,
    id: identifierGeneratorSpy.result
  }
}

export const mockUpdateToken = async (id: string): Promise<string> => {
  const accessToken = faker.random.alphaNumeric(32)
  const updateAccessTokenPostgresRepository = new UpdateAccessTokenPostgresRepository()
  await updateAccessTokenPostgresRepository.updateAccessToken({
    id,
    accessToken
  })
  return accessToken
}
