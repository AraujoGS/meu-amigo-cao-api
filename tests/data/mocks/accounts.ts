import { Decrypter, HashComparer, Encrypter, Hasher } from '@/data/interfaces/cryptography'
import {
  LoadAccountByEmailAndPhoneRepository,
  UpdatePasswordRepository,
  LoadAccountByTokenRepository,
  LoadAccountByIdRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  AddAccountRepository,
  CheckAccountByEmailRepository,
  CheckAccountByPhoneRepository
} from '@/data/interfaces/db'
import { RandomPasswordGenerator } from '@/data/interfaces/utils'
import { SendEmailRecoverPassword } from '@/data/interfaces/comunication'
import faker from 'faker'
faker.locale = 'pt_BR'

export class DecrypterSpy implements Decrypter {
  value: Decrypter.Params
  result = faker.random.word()
  decrypt (value: Decrypter.Params): Decrypter.Result {
    this.value = value
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  data: LoadAccountByTokenRepository.Params
  result = {
    id: faker.datatype.uuid()
  }

  async load (data: LoadAccountByTokenRepository.Params): Promise<LoadAccountByTokenRepository.Result> {
    this.data = data
    return this.result
  }
}

export class LoadAccountByEmailAndPhoneRepositorySpy implements LoadAccountByEmailAndPhoneRepository {
  data: LoadAccountByEmailAndPhoneRepository.Params
  result = {
    name: faker.name.findName(),
    email: faker.internet.email()
  }

  async load (data: LoadAccountByEmailAndPhoneRepository.Params): Promise<LoadAccountByEmailAndPhoneRepository.Result> {
    this.data = data
    return this.result
  }
}

export class RandomPasswordGeneratorSpy implements RandomPasswordGenerator {
  count = 0
  result = faker.random.alphaNumeric(12)

  generate (): RandomPasswordGenerator.Result {
    this.count++
    return this.result
  }
}

export class UpdatePasswordRepositorySpy implements UpdatePasswordRepository {
  data: UpdatePasswordRepository.Params
  async update (data: UpdatePasswordRepository.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}

export class SendEmailRecoverPasswordSpy implements SendEmailRecoverPassword {
  data: SendEmailRecoverPassword.Params
  async send (data: SendEmailRecoverPassword.Params): Promise<void> {
    this.data = data
  }
}

export class LoadAccountByIdRepositorySpy implements LoadAccountByIdRepository {
  id: LoadAccountByIdRepository.Params
  result = {
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(32)
  }

  async load (id: LoadAccountByIdRepository.Params): Promise<LoadAccountByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: LoadAccountByEmailRepository.Params
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    password: faker.datatype.hexaDecimal()
  }

  async load (email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class HashComparerSpy implements HashComparer {
  data: HashComparer.Params
  result = true
  async compare (data: HashComparer.Params): Promise<HashComparer.Result> {
    this.data = data
    return this.result
  }
}

export class EncrypterSpy implements Encrypter {
  value: Encrypter.Params
  result = faker.random.alphaNumeric()
  encrypt (value: Encrypter.Params): Encrypter.Result {
    this.value = value
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  data: UpdateAccessTokenRepository.Params
  async update (data: UpdateAccessTokenRepository.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}

export class HasherSpy implements Hasher {
  password: string
  result = faker.datatype.hexaDecimal()
  async hash (data: Hasher.Params): Promise<Hasher.Result> {
    this.password = data
    return this.result
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  data: AddAccountRepository.Params
  result = true
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.data = data
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: CheckAccountByEmailRepository.Params
  result = false
  async check (email: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class CheckAccountByPhoneRepositorySpy implements CheckAccountByPhoneRepository {
  phone: CheckAccountByPhoneRepository.Params
  result = false
  async check (phone: CheckAccountByPhoneRepository.Params): Promise<CheckAccountByPhoneRepository.Result> {
    this.phone = phone
    return this.result
  }
}
