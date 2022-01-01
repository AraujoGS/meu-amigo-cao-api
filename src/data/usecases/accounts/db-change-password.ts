import { LoadAccountByIdRepository } from '@/data/interfaces/db'
import { HashComparer } from '@/data/interfaces/cryptography'
import { ChangePasswordResult } from '@/domain/models'
import { ChangePassword } from '@/domain/usecases'

export class DbChangePassword implements ChangePassword {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async change (data: ChangePassword.Params): Promise<ChangePassword.Result> {
    const { id, oldPassword } = data
    const account = await this.loadAccountByIdRepository.loadById(id)
    if (account) {
      await this.hashComparer.compare({ value: oldPassword, hash: account.password })
    }
    return ChangePasswordResult.ERROR_ACCOUNT_NOT_EXISTS
  }
}
