import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/interfaces/db'
import { HashComparer, Encrypter } from '@/data/interfaces/cryptography'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(data.email)
    if (account) {
      const isValid = await this.hashComparer.compare({ hash: account.password, value: data.password })
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken({ id: account.id, accessToken })
      }
    }
    return null
  }
}
