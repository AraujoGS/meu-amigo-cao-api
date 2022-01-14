import { DbLoadCustomerById } from '@/data/usecases'
import { LoadCustomerById } from '@/domain/usecases'
import { LoadCustomerByIdPostgresRepository, LoadAddressByCustomerIdPostgresRepository, LoadPetsByCustomerIdPostgresRepository } from '@/infra/db'

export const makeDbLoadCustomerById = (): LoadCustomerById => {
  const loadCustomerByIdPostgresRepository = new LoadCustomerByIdPostgresRepository()
  const loadAddressByCustomerIdPostgresRepository = new LoadAddressByCustomerIdPostgresRepository()
  const loadPetsByCustomerIdPostgresRepository = new LoadPetsByCustomerIdPostgresRepository()
  return new DbLoadCustomerById(loadCustomerByIdPostgresRepository, loadAddressByCustomerIdPostgresRepository, loadPetsByCustomerIdPostgresRepository)
}
