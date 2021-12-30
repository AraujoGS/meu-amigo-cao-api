export namespace SendEmailRecoverPassword {
  export type Params = {
    name: string
    email: string
    password: string
  }
}

export interface SendEmailRecoverPassword {
  send: (params: SendEmailRecoverPassword.Params) => Promise<void>
}
