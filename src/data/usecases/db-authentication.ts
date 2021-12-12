import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/interfaces/db'
import { HashComparer } from '@/data/interfaces/cryptography'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(data.email)
    if (account) {
      await this.hashComparer.compare({
        hash: account.password,
        value: data.password
      })
    }
    return null
  }
}
