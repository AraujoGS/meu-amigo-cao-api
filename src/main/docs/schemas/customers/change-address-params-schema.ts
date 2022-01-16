export const changeAddressParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: 'd9121aa0-3e20-463c-bff6-c9594a25c933'
    },
    zipcode: {
      type: 'string',
      default: '03086090'
    },
    address: {
      type: 'string',
      default: 'Rua Leonardo da Silva'
    },
    number: {
      type: 'integer',
      default: 101
    },
    district: {
      type: 'string',
      default: 'Parque São Jorge'
    },
    city: {
      type: 'string',
      default: 'São Paulo'
    },
    state: {
      type: 'string',
      default: 'SP'
    },
    complement: {
      type: 'string',
      default: 'casa'
    }
  },
  required: ['id', 'zipcode', 'address', 'number', 'district', 'city', 'state']
}
