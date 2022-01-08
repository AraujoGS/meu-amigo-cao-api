import { AddPetRepository } from '@/data/interfaces/db'
import { IdentifierGenerator } from '@/data/interfaces/utils'

export class AddPetPostgresRepository implements AddPetRepository {
  constructor (
    private readonly identifierGenerator: IdentifierGenerator
  ) {}

  async add (data: AddPetRepository.Params): Promise<void> {
    this.identifierGenerator.generate()
  }
}
