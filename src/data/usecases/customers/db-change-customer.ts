import { LoadCustomerByEmailRepository } from '@/data/interfaces/db'
import { ActionResult } from '@/domain/models'
import { ChangeCustomer } from '@/domain/usecases'

export class DbChangeCustomer implements ChangeCustomer {
  constructor (
    private readonly loadCustomerByEmailRepository: LoadCustomerByEmailRepository
  ) {}

  async change (data: ChangeCustomer.Params): Promise<ChangeCustomer.Result> {
    const { id, email } = data
    const ownerEmail = await this.loadCustomerByEmailRepository.load(email)
    if (ownerEmail && ownerEmail.id !== id) {
      return ActionResult.ERROR_EMAIL_IN_USE
    }
    return null
  }
}
