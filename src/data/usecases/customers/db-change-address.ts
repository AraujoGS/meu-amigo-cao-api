import { ChangeAddress } from '@/domain/usecases'
import { CheckAddressByIdAndCustomerIdRepository, UpdateAddressRepository } from '@/data/interfaces/db'

export class DbChangeAddress implements ChangeAddress {
  constructor (
    private readonly checkAddressByIdAndCustomerIdRepository: CheckAddressByIdAndCustomerIdRepository,
    private readonly updateAddressRepository: UpdateAddressRepository
  ) {}

  async change (data: ChangeAddress.Params): Promise<ChangeAddress.Result> {
    const { id, accountId } = data
    const isValid = await this.checkAddressByIdAndCustomerIdRepository.check({ id, accountId })
    if (isValid) {
      await this.updateAddressRepository.update(data)
    }
    return false
  }
}
