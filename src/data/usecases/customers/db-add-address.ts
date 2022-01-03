import { AddAddress } from '@/domain/usecases'
import { LoadAccountByIdRepository, AddAddressRepository } from '@/data/interfaces/db'

export class DbAddAddress implements AddAddress {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly addAddressRepository: AddAddressRepository
  ) {}

  async add (params: AddAddress.Params): Promise<AddAddress.Result> {
    const account = await this.loadAccountByIdRepository.loadById(params.accountId)
    if (account) {
      await this.addAddressRepository.add(params)
    }
    return null
  }
}
