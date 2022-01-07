import { AddAddressRepository } from '@/data/interfaces/db'
import { AddAddress } from '@/domain/usecases'

export class DbAddAddress implements AddAddress {
  constructor (
    private readonly addAddressRepository: AddAddressRepository
  ) {}

  async add (params: AddAddress.Params): Promise<void> {
    await this.addAddressRepository.add(params)
  }
}
