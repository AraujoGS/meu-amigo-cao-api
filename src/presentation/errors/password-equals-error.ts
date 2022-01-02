export class PasswordEqualsError extends Error {
  constructor () {
    super('The passwords entered are the same.')
    this.name = 'PasswordEqualsError'
  }
}
