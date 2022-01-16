import { DbChangeAddress } from '@/data/usecases'
import { ChangeAddress } from '@/domain/usecases'
import { CheckAddressByIdAndCustomerIdPostgresRepository, UpdateAddressPostgresRepository } from '@/infra/db'

export const makeDbChangeAddress = (): ChangeAddress => {
  const checkAddressByIdAndCustomerIdPostgresRepository = new CheckAddressByIdAndCustomerIdPostgresRepository()
  const updateAddressPostgresRepository = new UpdateAddressPostgresRepository()
  return new DbChangeAddress(checkAddressByIdAndCustomerIdPostgresRepository, updateAddressPostgresRepository)
}
