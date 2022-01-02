export class InvalidPasswordError extends Error {
  constructor () {
    super('The password entered is incorrect.')
    this.name = 'InvalidPasswordError'
  }
}
