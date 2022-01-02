export class AccountNotExistsError extends Error {
  constructor () {
    super('The account was not found.')
    this.name = 'AccountNotExistsError'
  }
}
