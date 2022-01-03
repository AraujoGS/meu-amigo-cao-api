import { ActionResult } from '@/domain/models'
import { AccountNotExistsError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class AccountNotExistsValidation implements Validation {
  constructor (private readonly field: string) {}
  validate (input: any): Error {
    if (input[this.field] === ActionResult.ERROR_ACCOUNT_NOT_EXISTS) {
      return new AccountNotExistsError()
    }
  }
}
