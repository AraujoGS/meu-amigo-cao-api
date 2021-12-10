export namespace CheckAccountByPhoneRepository {
  export type Params = string
  export type Result = boolean
}

export interface CheckAccountByPhoneRepository {
  check: (phone: CheckAccountByPhoneRepository.Params) => Promise<CheckAccountByPhoneRepository.Result>
}
