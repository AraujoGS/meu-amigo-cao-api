import { LoadAccountByIdRepository } from '@/data/interfaces/db'
import { HashComparer, Hasher } from '@/data/interfaces/cryptography'
import { ChangePasswordResult } from '@/domain/models'
import { ChangePassword } from '@/domain/usecases'

export class DbChangePassword implements ChangePassword {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly hashComparer: HashComparer,
    private readonly hasher: Hasher
  ) {}

  async change (data: ChangePassword.Params): Promise<ChangePassword.Result> {
    const { id, oldPassword, newPassword } = data
    const account = await this.loadAccountByIdRepository.loadById(id)
    if (account) {
      const isValid = await this.hashComparer.compare({ value: oldPassword, hash: account.password })
      if (!isValid) return ChangePasswordResult.ERROR_INVALID_PASSWORD
      await this.hasher.hash(newPassword)
    }
    return ChangePasswordResult.ERROR_ACCOUNT_NOT_EXISTS
  }
}
