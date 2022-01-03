import { IdentifierGenerator } from '@/data/interfaces/utils'
import { AddAddressRepository } from '@/data/interfaces/db'

export class AddAddressPostgresRepository implements AddAddressRepository {
  constructor (
    private readonly identifierGenerator: IdentifierGenerator
  ) {}

  async add (data: AddAddressRepository.Params): Promise<void> {
    this.identifierGenerator.generate()
  }
}
