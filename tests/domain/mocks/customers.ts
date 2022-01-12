import { AddAddress, LoadCustomerById } from '@/domain/usecases'
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
