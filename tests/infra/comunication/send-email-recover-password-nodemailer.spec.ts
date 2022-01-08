import 'dotenv/config'
import { NodemailerHelper, SendEmailRecoverPasswordNodemailer } from '@/infra/comunication'
import faker from 'faker'
import { throwError } from '@/tests/domain/mocks'

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

describe('SendEmailRecoverPasswordNodemailer', () => {
  beforeAll(() => {
    NodemailerHelper.create()
  })
  it('should SendEmailRecoverPasswordNodemailer call send with correct value', async () => {
    const sut = makeSut()
    const data = makeFakeAccount()
    const sendSpy = jest.spyOn(NodemailerHelper, 'send')
    await sut.send(data)
    expect(sendSpy).toHaveBeenCalledWith({
      from: process.env.FROM_EMAIL,
      subject: 'Recuperação de senha',
      to: `${data.name} <${data.email}>`,
      html: `Olá ${data.name}, foi gerada para você a senha temporária: ${data.password}<br><br> Assim que possível recomendamos alterar-lá.<br><br> Obrigado.`
    })
  })
  it('should SendEmailRecoverPasswordNodemailer throw error if send throws', async () => {
    const sut = makeSut()
    const data = makeFakeAccount()
    jest.spyOn(NodemailerHelper, 'send').mockImplementationOnce(throwError)
    const promise = sut.send(data)
    expect(promise).rejects.toThrow()
  })
})
