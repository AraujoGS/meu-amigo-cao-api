import { SendEmailRecoverPassword } from '@/data/interfaces/comunication'
import { NodemailerHelper } from '@/infra/comunication'

export class SendEmailRecoverPasswordNodemailer implements SendEmailRecoverPassword {
  async send (data: SendEmailRecoverPassword.Params): Promise<void> {
    const { name, email, password } = data
    await NodemailerHelper.send({
      from: process.env.FROM_EMAIL,
      subject: 'Recuperação de senha',
      to: `${name} <${email}>`,
      html: `Olá ${name}, foi gerada para você a senha temporária: ${password}<br><br> Assim que possível recomendamos alterar-lá.<br><br> Obrigado.`
    })
  }
}
