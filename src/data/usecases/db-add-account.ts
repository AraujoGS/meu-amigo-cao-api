import { AddAccount } from '@/domain/usecases'
import { CreationAccountResult } from '@/domain/models'
import { Hasher } from '@/data/interfaces/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository, CheckAccountByPhoneRepository } from '@/data/interfaces/db'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly checkAccountByPhoneRepository: CheckAccountByPhoneRepository
  ) {}

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    const { password, email, phone } = data
    const emailInUse = await this.checkAccountByEmailRepository.check(email)
    if (emailInUse) return CreationAccountResult.ERROR_EMAIL
    await this.checkAccountByPhoneRepository.check(phone)
    const hashedPassword = await this.hasher.hash(password)
    const isValid = await this.addAccountRepository.add({
      ...data,
      password: hashedPassword
    })
    const result = isValid ? CreationAccountResult.SUCCESS : CreationAccountResult.ERROR
    return result
  }
}
