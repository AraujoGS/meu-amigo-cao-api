export namespace UpdateAccessTokenRepository {
  export type Params = {
    id: string
    accessToken: string
  }
}

export interface UpdateAccessTokenRepository {
  updateAccessToken: (data: UpdateAccessTokenRepository.Params) => Promise<void>
}
