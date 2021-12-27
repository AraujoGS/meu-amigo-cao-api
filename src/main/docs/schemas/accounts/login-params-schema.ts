export const loginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      default: 'a.perreira@gmail.com'
    },
    password: {
      type: 'string',
      default: '123'
    }
  },
  required: ['email', 'password']
}
