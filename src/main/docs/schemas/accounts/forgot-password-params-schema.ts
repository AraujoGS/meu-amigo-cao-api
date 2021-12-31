export const forgotPasswordParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      default: 'a.perreira@gmail.com'
    },
    phone: {
      type: 'string',
      default: '11936544141'
    }
  },
  required: ['email', 'phone']
}
