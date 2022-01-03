import { AccountNotExistsValidation } from '@/validation/validators'
import { ChangePasswordResult } from '@/domain/models'
import { AccountNotExistsError } from '@/presentation/errors'

const makeSut = (): AccountNotExistsValidation => new AccountNotExistsValidation('resultChangePassword')

describe('AccountNotExists Validation', () => {
  it('should AccountNotExistsValidation return error if account not exists', () => {
    const sut = makeSut()
    const error = sut.validate({ resultChangePassword: ChangePasswordResult.ERROR_ACCOUNT_NOT_EXISTS })
    expect(error).toEqual(new AccountNotExistsError())
  })
})
