export const addressSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '852d7b3b-d21f-4aac-9757-0c693e9c6244'
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
  }
}
