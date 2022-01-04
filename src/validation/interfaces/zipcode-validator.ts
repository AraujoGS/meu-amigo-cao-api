export namespace ZipCodeValidator {
  export type Params = string
  export type Result = boolean
}
export interface ZipCodeValidator {
  isValid: (zipcode: ZipCodeValidator.Params) => ZipCodeValidator.Result
}
