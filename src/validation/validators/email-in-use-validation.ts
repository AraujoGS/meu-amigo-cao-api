import { ActionResult } from '@/domain/models'
import { EmailInUseError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class EmailInUseValidation implements Validation {
  constructor (private readonly field: string) {}
  validate (input: any): Error {
    if (input[this.field] === ActionResult.ERROR_EMAIL_IN_USE) {
      return new EmailInUseError()
    }
  }
}
