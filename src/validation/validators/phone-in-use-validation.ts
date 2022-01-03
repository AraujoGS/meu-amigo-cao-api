import { ActionResult } from '@/domain/models'
import { PhoneInUseError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class PhoneInUseValidation implements Validation {
  constructor (private readonly field: string) {}
  validate (input: any): Error {
    if (input[this.field] === ActionResult.ERROR_PHONE_IN_USE) {
      return new PhoneInUseError()
    }
  }
}
