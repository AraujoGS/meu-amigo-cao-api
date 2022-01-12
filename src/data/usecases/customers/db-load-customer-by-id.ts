import { LoadCustomerByIdRepository, LoadAddressByCustomerIdRepository, LoadPetsByCustomerIdRepository } from '@/data/interfaces/db'
import { LoadCustomerById } from '@/domain/usecases'

export class DbLoadCustomerById implements LoadCustomerById {
  constructor (
    private readonly loadCustomerByIdRepository: LoadCustomerByIdRepository,
    private readonly loadAddressByCustomerIdRepository: LoadAddressByCustomerIdRepository,
    private readonly loadPetsByCustomerIdRepository: LoadPetsByCustomerIdRepository
  ) {}

  async load (id: string): Promise<LoadCustomerById.Result> {
    const [customer, address, pets] = await Promise.all([
      this.loadCustomerByIdRepository.load(id),
      this.loadAddressByCustomerIdRepository.load(id),
      this.loadPetsByCustomerIdRepository.load(id)
    ])
    return {
      ...customer,
      address,
      pets
    }
  }
}
