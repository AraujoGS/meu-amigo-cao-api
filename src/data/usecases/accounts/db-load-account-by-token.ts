import { Decrypter } from '@/data/interfaces/cryptography'
import { LoadAccountByToken } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async loadByToken (data: LoadAccountByToken.Params): Promise<LoadAccountByToken.Result> {
    const { token } = data
    try {
      this.decrypter.decrypt(token)
    } catch (error) {
      return null
    }
    return null
  }
}
