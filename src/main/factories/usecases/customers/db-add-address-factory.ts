import { DbAddAddress } from '@/data/usecases'
import { AddAddress } from '@/domain/usecases'
import { LoadAccountByIdPostgresRepository, AddAddressPostgresRepository } from '@/infra/db'
import { UuidAdapter } from '@/infra/utils'

export const makeDbAddAddress = (): AddAddress => {
  const loadAccountByIdPostgresRepository = new LoadAccountByIdPostgresRepository()
  const uuidAdapter = new UuidAdapter()
  const addAddressPostgresRepository = new AddAddressPostgresRepository(uuidAdapter)
  return new DbAddAddress(loadAccountByIdPostgresRepository, addAddressPostgresRepository)
}
