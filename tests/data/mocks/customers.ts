import {
  AddAddressRepository,
  LoadCustomerByIdRepository,
  LoadAddressByCustomerIdRepository,
  LoadPetsByCustomerIdRepository,
  LoadCustomerByEmailRepository,
  LoadCustomerByPhoneRepository,
  UpdateCustomerRepository
} from '@/data/interfaces/db'
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

export class LoadAddressByCustomerIdRepositorySpy implements LoadAddressByCustomerIdRepository {
  id: LoadAddressByCustomerIdRepository.Params
  result = [{
    id: faker.datatype.uuid(),
    zipcode: faker.address.zipCode('########'),
    address: faker.address.streetAddress(),
    city: faker.address.cityName(),
    number: faker.datatype.number(),
    district: faker.random.word(),
    state: faker.address.stateAbbr(),
    complement: faker.random.word()
  }]

  async load (id: LoadAddressByCustomerIdRepository.Params): Promise<LoadAddressByCustomerIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadPetsByCustomerIdRepositorySpy implements LoadPetsByCustomerIdRepository {
  id: LoadPetsByCustomerIdRepository.Params
  result = [{
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    breed: 'Maltês',
    color: faker.random.word(),
    type: 'MINI',
    considerations: faker.random.words()
  }]

  async load (id: LoadPetsByCustomerIdRepository.Params): Promise<LoadPetsByCustomerIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadCustomerByEmailRepositorySpy implements LoadCustomerByEmailRepository {
  email: LoadCustomerByEmailRepository.Params
  result = null

  async load (email: LoadCustomerByEmailRepository.Params): Promise<LoadCustomerByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadCustomerByPhoneRepositorySpy implements LoadCustomerByPhoneRepository {
  phone: LoadCustomerByPhoneRepository.Params
  result = null

  async load (phone: LoadCustomerByPhoneRepository.Params): Promise<LoadCustomerByPhoneRepository.Result> {
    this.phone = phone
    return this.result
  }
}

export class UpdateCustomerRepositorySpy implements UpdateCustomerRepository {
  data: UpdateCustomerRepository.Params
  async update (data: UpdateCustomerRepository.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}
