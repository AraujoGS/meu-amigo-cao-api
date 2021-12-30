import { PasswordGeneratorAdapter } from '@/infra/utils'
import passwordGenerate from 'generate-password'
import faker from 'faker'

const fakePwd = faker.random.alphaNumeric(12)
const lenghPwd = 8
const makeSut = (): PasswordGeneratorAdapter => new PasswordGeneratorAdapter(lenghPwd)

jest.mock('generate-password', () => ({
  generate: (): string => fakePwd
}))

describe('Password Generator Adapter', () => {
  it('should PasswordGeneratorAdapter call generate correctly', () => {
    const sut = makeSut()
    const generatePasswordSpy = jest.spyOn(passwordGenerate, 'generate')
    sut.generate()
    expect(generatePasswordSpy).toHaveBeenCalledWith({
      length: lenghPwd,
      numbers: true
    })
  })
})
