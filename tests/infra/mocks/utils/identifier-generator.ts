import { IdentifierGenerator } from '@/data/interfaces/utils'
import faker from 'faker'
export class IdentifierGeneratorSpy implements IdentifierGenerator {
  callNumber = 0
  result = faker.datatype.uuid()
  generate (): IdentifierGenerator.Result {
    this.callNumber++
    return this.result
  }
}
