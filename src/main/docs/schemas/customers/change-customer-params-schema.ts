export const changeCustomerParamsSchema = {
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
    phone: {
      type: 'string',
      default: '11936544141'
    },
    birthDate: {
      type: 'string',
      default: '1997-05-30'
    }
  },
  required: ['name', 'email', 'phone', 'birthDate']
}
