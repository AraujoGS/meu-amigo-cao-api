import { AddAddressRepository } from '@/data/interfaces/db'
import faker from 'faker'
faker.locale = 'pt_BR'

export class AddAddressRepositorySpy implements AddAddressRepository {
  data: AddAddressRepository.Params
  async add (data: AddAddressRepository.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}
