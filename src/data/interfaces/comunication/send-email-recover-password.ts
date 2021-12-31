export namespace SendEmailRecoverPassword {
  export type Params = {
    name: string
    email: string
    password: string
  }
}

export interface SendEmailRecoverPassword {
  send: (data: SendEmailRecoverPassword.Params) => Promise<void>
}
