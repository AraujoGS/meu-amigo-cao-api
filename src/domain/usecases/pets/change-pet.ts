export namespace ChangePet {
  export type Params = {
    id: string
    accountId: string
    name: string
    breed: number
    color: string
    type: number
    considerations: string
  }
  export type Result = boolean
}

export interface ChangePet {
  change: (data: ChangePet.Params) => Promise<ChangePet.Result>
}
