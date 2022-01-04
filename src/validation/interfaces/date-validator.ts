export namespace DateValidator {
  export type Params = string
  export type Result = boolean
}
export interface DateValidator {
  isValid: (date: DateValidator.Params) => DateValidator.Result
}
