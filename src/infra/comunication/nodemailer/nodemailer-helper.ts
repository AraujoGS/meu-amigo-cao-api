import { createTransport, Transporter } from 'nodemailer'

type EmailParams = {
  from: string
  to: string
  subject: string
  html: string
}

export const NodemailerHelper = {
  transport: null as Transporter,
  create (): void {
    this.transport = createTransport({
      host: process.env.HOST_EMAIL,
      port: parseInt(process.env.PORT_EMAIL),
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PWD_EMAIL
      }
    })
  },
  async send (data: EmailParams): Promise<void> {
    await this.transport.sendMail(data)
  }
}
