export class InvalidAddressError extends Error {
  constructor () {
    super('Address not exists or belongs to user logged.')
    this.name = 'InvalidAddressError'
  }
}
