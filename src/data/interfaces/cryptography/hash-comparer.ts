export namespace HashComparer {
  export type Params = {
    value: string
    hash: string
  }
  export type Result = boolean
}
export interface HashComparer {
  compare: (data: HashComparer.Params) => Promise<HashComparer.Result>
}
