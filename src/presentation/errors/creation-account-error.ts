export class CreationAccountError extends Error {
  constructor () {
    super('There was a problem and the account was not created.')
    this.name = 'CreationAccountError'
  }
}
