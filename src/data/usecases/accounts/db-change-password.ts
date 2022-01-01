import { LoadAccountByIdRepository } from '@/data/interfaces/db'
import { ChangePasswordResult } from '@/domain/models'
import { ChangePassword } from '@/domain/usecases'

export class DbChangePassword implements ChangePassword {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async change (data: ChangePassword.Params): Promise<ChangePassword.Result> {
    const { id } = data
    await this.loadAccountByIdRepository.loadById(id)
    return ChangePasswordResult.ERROR_ACCOUNT_NOT_EXISTS
  }
}
