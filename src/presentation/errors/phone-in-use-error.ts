export class PhoneInUseError extends Error {
  constructor () {
    super('The received phone is already in use')
    this.name = 'PhoneInUseError'
  }
}
