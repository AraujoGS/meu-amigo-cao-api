export const signUpParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      default: 'Guilherme de Araujo'
    },
    email: {
      type: 'string',
      default: 'garaujo@dev.com'
    },
    password: {
      type: 'string',
      default: '123'
    },
    passwordConfirmation: {
      type: 'string',
      default: '123'
    },
    phone: {
      type: 'string',
      default: '11936544141'
    },
    birthDate: {
      type: 'string',
      default: '1997-05-30'
    }
  },
  required: ['name', 'email', 'password', 'passwordConfirmation', 'phone', 'birthDate']
}
