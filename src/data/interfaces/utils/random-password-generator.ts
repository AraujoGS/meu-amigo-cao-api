export namespace RandomPasswordGenerator {
  export type Result = string
}

export interface RandomPasswordGenerator {
  generate: () => RandomPasswordGenerator.Result
}
