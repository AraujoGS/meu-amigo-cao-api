import { AddAddress } from '@/domain/usecases'
import { LoadAccountByIdRepository } from '@/data/interfaces/db'

export class DbAddAddress implements AddAddress {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async add (params: AddAddress.Params): Promise<AddAddress.Result> {
    const { accountId: id } = params
    await this.loadAccountByIdRepository.loadById(id)
    return null
  }
}
