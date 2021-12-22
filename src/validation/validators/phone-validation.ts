import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class PhoneValidation implements Validation {
  constructor (
    private readonly field: string
  ) {}

  validate (input: any): Error {
    const regExpPhone = /(?=^(\+?5{2}-?|0)[1-9]{2}-?\d{4}-?\d{4}$)(^(\+?5{2}-?|0)[1-9]{2}-?[1-9]{1}\d{3}-?\d{4}$)|(^(\+?5{2}-?|0)[1-9]{2}-?9[1-9]{1}\d{3}-?\d{4}$)/
    const phone = input[this.field]
    const isValid = regExpPhone.test(`+55${phone}`)
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
  }
}
