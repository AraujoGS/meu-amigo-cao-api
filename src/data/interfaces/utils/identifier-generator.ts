export namespace IdentifierGenerator {
  export type Result = string
}

export interface IdentifierGenerator {
  generate: () => IdentifierGenerator.Result
}
