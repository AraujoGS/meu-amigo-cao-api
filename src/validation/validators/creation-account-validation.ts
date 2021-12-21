import { CreationAccountResult } from '@/domain/models'
import { CreationAccountError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class CreationAccountValidation implements Validation {
  constructor (private readonly field: string) {}
  validate (input: any): Error {
    if (input[this.field] === CreationAccountResult.ERROR) {
      return new CreationAccountError()
    }
  }
}
