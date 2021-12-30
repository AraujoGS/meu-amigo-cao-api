import 'dotenv/config'
import { NodemailerHelper, SendEmailRecoverPasswordNodemailer } from '@/infra/comunication'
import faker from 'faker'

const makeSut = (): SendEmailRecoverPasswordNodemailer => new SendEmailRecoverPasswordNodemailer()

const makeFakeAccount = (): { email: string, name: string, password: string } => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.random.alphaNumeric(12)
})

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue(() => {})
  })
}))

describe('Send Email Recover Password Nodemailer', () => {
  beforeAll(() => {
    NodemailerHelper.create()
  })
  it('should SendEmailRecoverPasswordNodemailer send email with success', async () => {
    const sut = makeSut()
    const params = makeFakeAccount()
    expect(async () => await sut.send(params)).not.toThrow()
  })
})