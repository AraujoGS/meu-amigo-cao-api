import { LoadCustomerByEmailRepository } from '@/data/interfaces/db'
import { ChangeCustomer } from '@/domain/usecases'

export class DbChangeCustomer implements ChangeCustomer {
  constructor (
    private readonly loadCustomerByEmailRepository: LoadCustomerByEmailRepository
  ) {}

  async change (data: ChangeCustomer.Params): Promise<ChangeCustomer.Result> {
    await this.loadCustomerByEmailRepository.load(data.email)
    return null
  }
}
