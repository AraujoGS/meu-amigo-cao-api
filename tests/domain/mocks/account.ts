import { AddAccount } from '@/domain/usecases'
import faker from 'faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.random.word(),
  phone: faker.phone.phoneNumber('###########'),
  birthDate: faker.date.past().getTime()
})
