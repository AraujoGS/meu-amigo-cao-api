export namespace UpdatePasswordRepository {
  export type Params = {
    email: string
    password: string
  }
}

export interface UpdatePasswordRepository {
  update: (data: UpdatePasswordRepository.Params) => Promise<void>
}
