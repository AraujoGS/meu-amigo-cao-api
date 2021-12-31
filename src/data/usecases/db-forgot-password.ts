import { ForgotPassword } from '@/domain/usecases'
import { LoadAccountByEmailAndPhoneRepository, UpdatePasswordRepository } from '@/data/interfaces/db'
import { Hasher } from '@/data/interfaces/cryptography'
import { RandomPasswordGenerator } from '@/data/interfaces/utils'
import { SendEmailRecoverPassword } from '@/data/interfaces/comunication'

export class DbForgotPassword implements ForgotPassword {
  constructor (
    private readonly loadAccountByEmailAndPhoneRepository: LoadAccountByEmailAndPhoneRepository,
    private readonly randomPasswordGenerator: RandomPasswordGenerator,
    private readonly hasher: Hasher,
    private readonly updatePasswordRepository: UpdatePasswordRepository,
    private readonly sendEmailRecoverPassword: SendEmailRecoverPassword
  ) {}

  async recover (params: ForgotPassword.Params): Promise<ForgotPassword.Result> {
    const account = await this.loadAccountByEmailAndPhoneRepository.loadByEmailAndPhone(params)
    if (account) {
      const randomPassword = this.randomPasswordGenerator.generate()
      this.hasher.hash(randomPassword)
      await Promise.all([
        this.updatePasswordRepository.updatePassword({ email: params.email, password: randomPassword }),
        this.sendEmailRecoverPassword.send({
          ...account,
          password: randomPassword
        })
      ])
      return true
    }
    return null
  }
}
