import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/interfaces/db'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    await this.loadAccountByEmailRepository.loadByEmail(data.email)
    return null
  }
}
