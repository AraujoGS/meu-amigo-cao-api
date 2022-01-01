import { AddAccount, Authentication, ForgotPassword, LoadAccountByToken } from '@/domain/usecases'
import { CreationAccountResult, LoadAccountByTokenModel } from '@/domain/models'
import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  data: AddAccount.Params
  result = CreationAccountResult.SUCCESS
  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    this.data = data
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  data: Authentication.Params
  result = {
    name: faker.name.findName(),
    accessToken: faker.random.alphaNumeric(32)
  }

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    this.data = data
    return this.result
  }
}

export class ForgotPasswordSpy implements ForgotPassword {
  data: ForgotPassword.Params
  result = true
  async recover (data: ForgotPassword.Params): Promise<ForgotPassword.Result> {
    this.data = data
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  data: LoadAccountByToken.Params
  result = {
    id: faker.datatype.uuid()
  }

  async loadByToken (data: LoadAccountByTokenModel): Promise<LoadAccountByToken.Result> {
    this.data = data
    return this.result
  }
}
