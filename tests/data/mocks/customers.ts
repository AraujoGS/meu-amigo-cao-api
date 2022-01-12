import { AddAddressRepository, LoadCustomerByIdRepository } from '@/data/interfaces/db'
import faker from 'faker'
faker.locale = 'pt_BR'

export class AddAddressRepositorySpy implements AddAddressRepository {
  data: AddAddressRepository.Params
  async add (data: AddAddressRepository.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}

export class LoadCustomerByIdRepositorySpy implements LoadCustomerByIdRepository {
  id: LoadCustomerByIdRepository.Params
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber('###########'),
    birthDate: faker.date.past()
  }

  async load (id: LoadCustomerByIdRepository.Params): Promise<LoadCustomerByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
