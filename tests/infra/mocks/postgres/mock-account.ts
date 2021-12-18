import { AddAccountModel } from '@/domain/models'
import { AddAccountPostgresRepository } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy } from '@/tests/infra/mocks'

export const mockAccount = async (): Promise<AddAccountModel> => {
  const params = mockAddAccountParams()
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const addAccountPostgresRepository = new AddAccountPostgresRepository(identifierGeneratorSpy)
  await addAccountPostgresRepository.add(params)
  return params
}
