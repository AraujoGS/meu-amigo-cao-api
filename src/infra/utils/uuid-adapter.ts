import { IdentifierGenerator } from '@/data/interfaces/utils'
import { v4 as uuid } from 'uuid'
export class UuidAdapter implements IdentifierGenerator {
  generate (): string {
    return uuid()
  }
}
