import { LoadCustomerByEmailRepository, LoadCustomerByPhoneRepository, UpdateCustomerRepository } from '@/data/interfaces/db'
import { ActionResult } from '@/domain/models'
import { ChangeCustomer } from '@/domain/usecases'

export class DbChangeCustomer implements ChangeCustomer {
  constructor (
    private readonly loadCustomerByEmailRepository: LoadCustomerByEmailRepository,
    private readonly loadCustomerByPhoneRepository: LoadCustomerByPhoneRepository,
    private readonly updateCustomerRepository: UpdateCustomerRepository
  ) {}

  async change (data: ChangeCustomer.Params): Promise<ChangeCustomer.Result> {
    const { id, email, phone } = data
    const ownerEmail = await this.loadCustomerByEmailRepository.load(email)
    if (ownerEmail && ownerEmail.id !== id) {
      return ActionResult.ERROR_EMAIL_IN_USE
    }
    const ownerPhone = await this.loadCustomerByPhoneRepository.load(phone)
    if (ownerPhone && ownerPhone.id !== id) {
      return ActionResult.ERROR_PHONE_IN_USE
    }
    await this.updateCustomerRepository.update(data)
    return ActionResult.SUCCESS
  }
}
