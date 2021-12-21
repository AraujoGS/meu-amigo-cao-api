import { AddAccount } from '@/domain/usecases'
import { CreationAccountResult } from '@/domain/models'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = CreationAccountResult.SUCCESS
  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = data
    return this.result
  }
}
