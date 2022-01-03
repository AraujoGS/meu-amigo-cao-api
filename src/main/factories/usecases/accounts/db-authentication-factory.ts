import { DbAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailPostgresRepository, UpdateAccessTokenPostgresRepository } from '@/infra/db'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'

export const makeDbAuthentication = (): Authentication => {
  const loadAccountByEmailPostgresRepository = new LoadAccountByEmailPostgresRepository()
  const salt = parseInt(process.env.SALT)
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const updateAccessTokenPostgresRepository = new UpdateAccessTokenPostgresRepository()
  return new DbAuthentication(loadAccountByEmailPostgresRepository, bcryptAdapter, jwtAdapter, updateAccessTokenPostgresRepository)
}
