import { AddAccount, Authentication } from '@/domain/usecases'
import { CreationAccountResult } from '@/domain/models'
import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = CreationAccountResult.SUCCESS
  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = data
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result: Authentication.Result = {
    name: faker.name.findName(),
    accessToken: faker.random.alphaNumeric(32)
  }

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    this.params = data
    return this.result
  }
}
