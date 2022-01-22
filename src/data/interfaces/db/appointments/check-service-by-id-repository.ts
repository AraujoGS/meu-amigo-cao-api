export namespace CheckServiceByIdRepository {
  export type Params = number
  export type Result = boolean
}

export interface CheckServiceByIdRepository {
  check: (id: CheckServiceByIdRepository.Params) => Promise<CheckServiceByIdRepository.Result>
}
