import { LoadCustomerByIdRepository } from '@/data/interfaces/db'
import { LoadCustomerById } from '@/domain/usecases'

export class DbLoadCustomerById implements LoadCustomerById {
  constructor (
    private readonly loadCustomerByIdRepository: LoadCustomerByIdRepository
  ) {}

  async load (id: string): Promise<LoadCustomerById.Result> {
    await this.loadCustomerByIdRepository.load(id)
    return null
  }
}
