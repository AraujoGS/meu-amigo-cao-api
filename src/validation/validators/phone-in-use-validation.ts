import { CreationAccountResult } from '@/domain/models'
import { PhoneInUseError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class PhoneInUseValidation implements Validation {
  constructor (private readonly field: string) {}
  validate (input: any): Error {
    if (input[this.field] === CreationAccountResult.ERROR_PHONE) {
      return new PhoneInUseError()
    }
  }
}
