import { ActionResult } from '@/domain/models'
import { AddAddress, LoadCustomerById, ChangeCustomer } from '@/domain/usecases'
import faker from 'faker'

export class AddAddressSpy implements AddAddress {
  data: AddAddress.Params
  async add (data: AddAddress.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}

export class LoadCustomerByIdSpy implements LoadCustomerById {
  id: LoadCustomerById.Params
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber('###########'),
    birthDate: faker.date.past(),
    address: [{
      id: faker.datatype.uuid(),
      zipcode: faker.address.zipCode('########'),
      address: faker.address.streetAddress(),
      city: faker.address.cityName(),
      number: faker.datatype.number(),
      district: faker.random.word(),
      state: faker.address.stateAbbr(),
      complement: faker.random.word()
    }],
    pets: [{
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      breed: 'Maltês',
      color: faker.random.word(),
      type: 'MINI',
      considerations: faker.random.words()
    }]
  }

  async load (id: LoadCustomerById.Params): Promise<LoadCustomerById.Result> {
    this.id = id
    return this.result
  }
}

export class ChangeCustomerSpy implements ChangeCustomer {
  data: ChangeCustomer.Params
  result = ActionResult.SUCCESS
  async change (data: ChangeCustomer.Params): Promise<ChangeCustomer.Result> {
    this.data = data
    return this.result
  }
}
