export namespace CheckDogBreedByIdRepository {
  export type Params = number
  export type Result = boolean
}

export interface CheckDogBreedByIdRepository {
  check: (id: CheckDogBreedByIdRepository.Params) => Promise<CheckDogBreedByIdRepository.Result>
}
