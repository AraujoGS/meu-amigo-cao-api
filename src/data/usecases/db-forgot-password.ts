import { ForgotPassword } from '@/domain/usecases'
import { LoadAccountByEmailAndPhoneRepository, UpdatePasswordRepository } from '@/data/interfaces/db'
import { RandomPasswordGenerator } from '@/data/interfaces/utils'
import { SendEmailRecoverPassword } from '@/data/interfaces/comunication'

export class DbForgotPassword implements ForgotPassword {
  constructor (
    private readonly loadAccountByEmailAndPhoneRepository: LoadAccountByEmailAndPhoneRepository,
    private readonly randomPasswordGenerator: RandomPasswordGenerator,
    private readonly updatePasswordRepository: UpdatePasswordRepository,
    private readonly sendEmailRecoverPassword: SendEmailRecoverPassword
  ) {}

  async recover (params: ForgotPassword.Params): Promise<ForgotPassword.Result> {
    const account = await this.loadAccountByEmailAndPhoneRepository.loadByEmailAndPhone(params)
    if (account) {
      const randomPassword = this.randomPasswordGenerator.generate()
      await this.updatePasswordRepository.updatePassword({ email: params.email, password: randomPassword })
      await this.sendEmailRecoverPassword.send({
        ...account,
        password: randomPassword
      })
      return true
    }
    return null
  }
}
