export namespace UpdatePasswordRepository {
  export type Params = {
    email: string
    password: string
  }
}

export interface UpdatePasswordRepository {
  updatePassword: (data: UpdatePasswordRepository.Params) => Promise<void>
}
