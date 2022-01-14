export const customerSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '7b967943-7366-4f36-bdb3-5ee4bd9d29bf'
    },
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
      default: '1997-05-30T00:00:00.000Z'
    },
    address: {
      type: 'array',
      items: {
        $ref: '#/schemas/address'
      }
    },
    pets: {
      type: 'array',
      items: {
        $ref: '#/schemas/pets'
      }
    }
  },
  required: ['id', 'name', 'email', 'phone', 'birthDate', 'address', 'pets']
}
