import { ForgotPassword } from '@/domain/usecases'
import { LoadAccountByEmailAndPhoneRepository } from '@/data/interfaces/db'

export class DbForgotPassword implements ForgotPassword {
  constructor (
    private readonly loadAccountByEmailAndPhoneRepository: LoadAccountByEmailAndPhoneRepository
  ) {}

  async recover (params: ForgotPassword.Params): Promise<void> {
    this.loadAccountByEmailAndPhoneRepository.loadByEmailAndPhone(params)
  }
}
