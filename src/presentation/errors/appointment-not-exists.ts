export class AppointmentNotExistsError extends Error {
  constructor () {
    super('The appointment was not found.')
    this.name = 'AppointmentNotExistsError'
  }
}
