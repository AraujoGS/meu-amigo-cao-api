import { CreationAccountValidation } from '@/validation/validators'
import { ActionResult } from '@/domain/models'
import { CreationAccountError } from '@/presentation/errors'

const makeSut = (): CreationAccountValidation => new CreationAccountValidation('resultAddAccount')

describe('EmailInUse Validation', () => {
  it('should CreationAccountValidation return error if account not created', () => {
    const sut = makeSut()
    const error = sut.validate({ resultAddAccount: ActionResult.ERROR })
    expect(error).toEqual(new CreationAccountError())
  })
})
