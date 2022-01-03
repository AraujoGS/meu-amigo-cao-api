import { DbChangePassword } from '@/data/usecases'
import { ChangePassword } from '@/domain/usecases'
import { LoadAccountByIdPostgresRepository, UpdatePasswordPostgresRepository } from '@/infra/db'
import { BcryptAdapter } from '@/infra/cryptography'

export const makeDbChangePassword = (): ChangePassword => {
  const loadAccountByIdPostgresRepository = new LoadAccountByIdPostgresRepository()
  const salt = parseInt(process.env.SALT)
  const bcryptAdapter = new BcryptAdapter(salt)
  const updatePasswordPostgresRepository = new UpdatePasswordPostgresRepository()
  return new DbChangePassword(loadAccountByIdPostgresRepository, bcryptAdapter, bcryptAdapter, updatePasswordPostgresRepository)
}
