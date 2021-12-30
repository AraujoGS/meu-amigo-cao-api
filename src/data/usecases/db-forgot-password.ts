import { ForgotPassword } from '@/domain/usecases'
import { LoadAccountByEmailAndPhoneRepository } from '@/data/interfaces/db'
import { RandomPasswordGenerator } from '@/data/interfaces/utils'
import { SendEmailRecoverPassword } from '@/data/interfaces/comunication'

export class DbForgotPassword implements ForgotPassword {
  constructor (
    private readonly loadAccountByEmailAndPhoneRepository: LoadAccountByEmailAndPhoneRepository,
    private readonly randomPasswordGenerator: RandomPasswordGenerator,
    private readonly sendEmailRecoverPassword: SendEmailRecoverPassword
  ) {}

  async recover (params: ForgotPassword.Params): Promise<ForgotPassword.Result> {
    const account = await this.loadAccountByEmailAndPhoneRepository.loadByEmailAndPhone(params)
    const randomPassword = this.randomPasswordGenerator.generate()
    await this.sendEmailRecoverPassword.send({
      ...account,
      password: randomPassword
    })
    return null
  }
}
