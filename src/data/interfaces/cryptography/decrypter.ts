export namespace Decrypter {
  export type Params = string
  export type Result = string
}
export interface Decrypter {
  decrypt: (value: Decrypter.Params) => Decrypter.Result
}
