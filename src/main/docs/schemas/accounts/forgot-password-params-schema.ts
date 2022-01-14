export const forgotPasswordParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      default: 'garaujo@dev.com'
    },
    phone: {
      type: 'string',
      default: '11936544141'
    }
  },
  required: ['email', 'phone']
}
