export const loginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      default: 'garaujo@dev.com'
    },
    password: {
      type: 'string',
      default: '123'
    }
  },
  required: ['email', 'password']
}
