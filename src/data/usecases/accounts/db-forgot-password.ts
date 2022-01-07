import { LoadAccountByEmailAndPhoneRepository, UpdatePasswordRepository } from '@/data/interfaces/db'
import { Hasher } from '@/data/interfaces/cryptography'
import { RandomPasswordGenerator } from '@/data/interfaces/utils'
import { SendEmailRecoverPassword } from '@/data/interfaces/comunication'
import { ForgotPassword } from '@/domain/usecases'

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
      const hashPassword = await this.hasher.hash(randomPassword)
      await Promise.all([
        this.updatePasswordRepository.updatePassword({ email: params.email, password: hashPassword }),
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
