export const customerSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: 'dcbb59f4-36a2-409f-8c64-68e4746eaa85'
    },
    name: {
      type: 'string',
      default: 'Guilherme de Araujo'
    },
    email: {
      type: 'string',
      default: 'guilhermearaujo421@gmail.com'
    },
    phone: {
      type: 'string',
      default: '11954976862'
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
