import { DbAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/cryptography'
import { AddAccountPostgresRepository, CheckAccountByEmailPostgresRepository, CheckAccountByPhonePostgresRepository } from '@/infra/db'
import { UuidAdapter } from '@/infra/utils'

export const makeDbAddAccount = (): AddAccount => {
  const salt = parseInt(process.env.SALT)
  const bcryptAdapter = new BcryptAdapter(salt)
  const uuidAdapter = new UuidAdapter()
  const addAccountPostgresRepository = new AddAccountPostgresRepository(uuidAdapter)
  const checkAccountByEmailPostgresRepository = new CheckAccountByEmailPostgresRepository()
  const checkAccountByPhonePostgresRepository = new CheckAccountByPhonePostgresRepository()
  return new DbAddAccount(bcryptAdapter, addAccountPostgresRepository, checkAccountByEmailPostgresRepository, checkAccountByPhonePostgresRepository)
}
