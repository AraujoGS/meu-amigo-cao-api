import { AddAccountPostgresRepository } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy } from '@/tests/infra/mocks'

type AccountModel = {
  id: string
  name: string
  email: string
  password: string
  phone: string
  birthDate: number
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
