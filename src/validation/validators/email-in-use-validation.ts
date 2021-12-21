import { CreationAccountResult } from '@/domain/models'
import { EmailInUseError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class EmailInUseValidation implements Validation {
  constructor (private readonly field: string) {}
  validate (input: any): Error {
    if (input[this.field] === CreationAccountResult.ERROR_EMAIL) {
      return new EmailInUseError()
    }
  }
}
