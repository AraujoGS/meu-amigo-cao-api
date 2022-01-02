import { Decrypter } from '@/data/interfaces/cryptography'
import { LoadAccountByTokenRepository } from '@/data/interfaces/db'
import { LoadAccountByToken } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async loadByToken (data: LoadAccountByToken.Params): Promise<LoadAccountByToken.Result> {
    let decriptedValue: string
    try {
      decriptedValue = this.decrypter.decrypt(data.token)
    } catch (error) {
      return null
    }
    if (decriptedValue) {
      const account = await this.loadAccountByTokenRepository.loadByToken({ token: data.token, role: data.role })
      if (account) return account
    }
    return null
  }
}
