export namespace UpdateAccessTokenRepository {
  export type Params = {
    id: string
    accessToken: string
  }
}

export interface UpdateAccessTokenRepository {
  update: (data: UpdateAccessTokenRepository.Params) => Promise<void>
}
