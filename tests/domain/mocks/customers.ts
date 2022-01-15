import { AddAddress, LoadCustomerById, ChangeCustomer } from '@/domain/usecases'
import faker from 'faker'
faker.locale = 'pt_BR'

export const mockAddAddressParams = (): AddAddress.Params => ({
  accountId: faker.datatype.uuid(),
  zipcode: faker.address.zipCode('########'),
  address: faker.address.streetAddress(),
  city: faker.address.cityName(),
  number: faker.datatype.number(),
  district: faker.random.word(),
  state: faker.address.stateAbbr(),
  complement: faker.random.word()
})

export const mockLoadCustomerById = (): LoadCustomerById.Params => faker.datatype.uuid()

export const mockChangeCustomerParams = (): ChangeCustomer.Params => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber('###########'),
  birthDate: faker.date.past()
})
