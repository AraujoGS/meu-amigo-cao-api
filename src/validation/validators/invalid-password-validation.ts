import { ChangePasswordResult } from '@/domain/models'
import { InvalidPasswordError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class InvalidPasswordValidation implements Validation {
  constructor (private readonly field: string) {}
  validate (input: any): Error {
    if (input[this.field] === ChangePasswordResult.ERROR_INVALID_PASSWORD) {
      return new InvalidPasswordError()
    }
  }
}
