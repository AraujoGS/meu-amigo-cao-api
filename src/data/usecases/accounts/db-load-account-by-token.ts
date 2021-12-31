import { Decrypter } from '@/data/interfaces/cryptography'
import { LoadAccountByTokenRepository } from '@/data/interfaces/db'
import { LoadAccountByToken } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async loadByToken (data: LoadAccountByToken.Params): Promise<LoadAccountByToken.Result> {
    let token: string
    try {
      token = this.decrypter.decrypt(data.token)
    } catch (error) {
      return null
    }
    if (token) {
      this.loadAccountByTokenRepository.loadByToken({ token, role: data.role })
    }
    return null
  }
}
