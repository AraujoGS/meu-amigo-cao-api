import { ForgotPassword } from '@/domain/usecases'
import { LoadAccountByEmailAndPhoneRepository } from '@/data/interfaces/db'
import { RandomPasswordGenerator } from '@/data/interfaces/utils'

export class DbForgotPassword implements ForgotPassword {
  constructor (
    private readonly loadAccountByEmailAndPhoneRepository: LoadAccountByEmailAndPhoneRepository,
    private readonly randomPasswordGenerator: RandomPasswordGenerator
  ) {}

  async recover (params: ForgotPassword.Params): Promise<ForgotPassword.Result> {
    await this.loadAccountByEmailAndPhoneRepository.loadByEmailAndPhone(params)
    this.randomPasswordGenerator.generate()
    return null
  }
}
