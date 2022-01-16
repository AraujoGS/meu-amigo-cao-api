export class InvalidAddressError extends Error {
  constructor () {
    super('Adress not exists or belongs to user logged.')
    this.name = 'InvalidAddressError'
  }
}
