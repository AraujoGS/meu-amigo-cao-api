import { CheckServiceByIdRepository } from '@/data/interfaces/db'

export class CheckServiceByIdRepositorySpy implements CheckServiceByIdRepository {
  id: CheckServiceByIdRepository.Params
  result = true
  async check (id: CheckServiceByIdRepository.Params): Promise<CheckServiceByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
