import { AddAccount } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = 0
  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = data
    return this.result
  }
}
