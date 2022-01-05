export const AddAddressParamsSchema = {
  type: 'object',
  properties: {
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
      default: 100
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
  required: ['zipcode', 'address', 'number', 'district', 'city', 'state']
}
