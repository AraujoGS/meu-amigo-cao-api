import { LoadCustomerByIdRepository, LoadAddressByCustomerIdRepository } from '@/data/interfaces/db'
import { LoadCustomerById } from '@/domain/usecases'

export class DbLoadCustomerById implements LoadCustomerById {
  constructor (
    private readonly loadCustomerByIdRepository: LoadCustomerByIdRepository,
    private readonly loadAddressByCustomerIdRepository: LoadAddressByCustomerIdRepository
  ) {}

  async load (id: string): Promise<LoadCustomerById.Result> {
    await this.loadCustomerByIdRepository.load(id)
    await this.loadAddressByCustomerIdRepository.load(id)
    return null
  }
}
