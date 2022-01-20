export class InvalidPetError extends Error {
  constructor () {
    super('Pet not exists or belongs to user logged.')
    this.name = 'InvalidPetError'
  }
}
