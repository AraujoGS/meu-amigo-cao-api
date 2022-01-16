import { DbChangeCustomer } from '@/data/usecases'
import { ChangeCustomer } from '@/domain/usecases'
import { LoadCustomerByEmailPostgresRepository, LoadCustomerByPhonePostgresRepository, UpdateCustomerPostgresRepository } from '@/infra/db'

export const makeDbChangeCustomer = (): ChangeCustomer => {
  const loadCustomerByEmailPostgresRepository = new LoadCustomerByEmailPostgresRepository()
  const loadCustomerByPhonePostgresRepository = new LoadCustomerByPhonePostgresRepository()
  const updateCustomerPostgresRepository = new UpdateCustomerPostgresRepository()
  return new DbChangeCustomer(loadCustomerByEmailPostgresRepository, loadCustomerByPhonePostgresRepository, updateCustomerPostgresRepository)
}
