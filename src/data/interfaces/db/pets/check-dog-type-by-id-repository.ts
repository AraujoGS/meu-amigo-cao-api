export namespace CheckDogTypeByIdRepository {
  export type Params = number
  export type Result = boolean
}

export interface CheckDogTypeByIdRepository {
  check: (id: CheckDogTypeByIdRepository.Params) => Promise<CheckDogTypeByIdRepository.Result>
}
