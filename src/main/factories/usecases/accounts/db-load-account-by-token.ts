import { DbLoadAccountByToken } from '@/data/usecases'
import { LoadAccountByToken } from '@/domain/usecases'
import { LoadAccountByTokenPostgresRepository } from '@/infra/db'
import { JwtAdapter } from '@/infra/cryptography'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const loadAccountByTokenPostgresRepository = new LoadAccountByTokenPostgresRepository()
  return new DbLoadAccountByToken(jwtAdapter, loadAccountByTokenPostgresRepository)
}
