export namespace Encrypter {
  export type Params = string
  export type Result = string
}

export interface Encrypter {
  encrypt: (value: Encrypter.Params) => Encrypter.Result
}
