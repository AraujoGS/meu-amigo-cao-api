export const signUpParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      default: 'Alberto Perreira'
    },
    email: {
      type: 'string',
      default: 'a.perreira@gmail.com'
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
      default: '1986-04-13'
    }
  },
  required: ['name', 'email', 'password', 'passwordConfirmation', 'phone', 'birthDate']
}
