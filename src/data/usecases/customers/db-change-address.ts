import { ChangeAddress } from '@/domain/usecases'
import { CheckAddressByIdAndCustomerIdRepository } from '@/data/interfaces/db'

export class DbChangeAddress implements ChangeAddress {
  constructor (
    private readonly checkAddressByIdAndCustomerIdRepository: CheckAddressByIdAndCustomerIdRepository
  ) {}

  async change (data: ChangeAddress.Params): Promise<ChangeAddress.Result> {
    const { id, accountId } = data
    await this.checkAddressByIdAndCustomerIdRepository.check({ id, accountId })
    return false
  }
}
