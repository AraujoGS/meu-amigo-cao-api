import { PasswordGeneratorAdapter } from '@/infra/utils'
import passwordGenerate from 'generate-password'
import faker from 'faker'
import { throwError } from '@/tests/domain/mocks'

const fakePwd = faker.random.alphaNumeric(12)
const lenghPwd = 8
const makeSut = (): PasswordGeneratorAdapter => new PasswordGeneratorAdapter(lenghPwd)

jest.mock('generate-password', () => ({
  generate: (): string => fakePwd
}))

describe('PasswordGenerator Adapter', () => {
  it('should PasswordGeneratorAdapter call generate correctly', () => {
    const sut = makeSut()
    const generatePasswordSpy = jest.spyOn(passwordGenerate, 'generate')
    sut.generate()
    expect(generatePasswordSpy).toHaveBeenCalledWith({
      length: lenghPwd,
      numbers: true
    })
  })
  it('should PasswordGeneratorAdapter throw error if generate throws', () => {
    const sut = makeSut()
    jest.spyOn(passwordGenerate, 'generate').mockImplementationOnce(throwError)
    expect(() => sut.generate()).toThrow()
  })
  it('should PasswordGeneratorAdapter return random password if generate success', () => {
    const sut = makeSut()
    const randomPwd = sut.generate()
    expect(randomPwd).toBe(fakePwd)
  })
})
