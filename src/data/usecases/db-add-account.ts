import { AddAccount } from '@/domain/usecases'
import { CreationAccountResult } from '@/domain/models'
import { Hasher } from '@/data/interfaces/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/interfaces/db'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    const { password, email } = data
    await this.checkAccountByEmailRepository.check(email)
    const hashedPassword = await this.hasher.hash(password)
    const isValid = await this.addAccountRepository.add({
      ...data,
      password: hashedPassword
    })
    const result = isValid ? CreationAccountResult.SUCCESS : CreationAccountResult.ERROR
    return result
  }
}
