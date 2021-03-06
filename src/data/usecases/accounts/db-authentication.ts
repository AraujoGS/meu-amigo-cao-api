import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/interfaces/db'
import { HashComparer, Encrypter } from '@/data/interfaces/cryptography'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.load(data.email)
    if (account) {
      const { id, password } = account
      const isValid = await this.hashComparer.compare({ hash: password, value: data.password })
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(id)
        await this.updateAccessTokenRepository.update({ id, accessToken })
        return {
          name: account.name,
          accessToken
        }
      }
    }
    return null
  }
}
