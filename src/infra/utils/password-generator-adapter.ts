import { RandomPasswordGenerator } from '@/data/interfaces/utils'
import passwordGenerate from 'generate-password'

export class PasswordGeneratorAdapter implements RandomPasswordGenerator {
  constructor (private readonly length: number) {}
  generate (): string {
    return passwordGenerate.generate({ length: this.length, numbers: true })
  }
}
