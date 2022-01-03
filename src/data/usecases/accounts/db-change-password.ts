import { LoadAccountByIdRepository, UpdatePasswordRepository } from '@/data/interfaces/db'
import { HashComparer, Hasher } from '@/data/interfaces/cryptography'
import { ActionResult } from '@/domain/models'
import { ChangePassword } from '@/domain/usecases'

export class DbChangePassword implements ChangePassword {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly hashComparer: HashComparer,
    private readonly hasher: Hasher,
    private readonly updatePasswordRepository: UpdatePasswordRepository
  ) {}

  async change (data: ChangePassword.Params): Promise<ChangePassword.Result> {
    const { id, oldPassword, newPassword } = data
    const account = await this.loadAccountByIdRepository.loadById(id)
    if (account) {
      const isValid = await this.hashComparer.compare({ value: oldPassword, hash: account.password })
      if (!isValid) return ActionResult.ERROR_INVALID_PASSWORD
      const hashedNewPassword = await this.hasher.hash(newPassword)
      await this.updatePasswordRepository.updatePassword({ email: account.email, password: hashedNewPassword })
      return ActionResult.SUCCESS
    }
    return ActionResult.ERROR_ACCOUNT_NOT_EXISTS
  }
}
