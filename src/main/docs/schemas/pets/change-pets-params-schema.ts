export const changePetParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '55796dd3-16de-4852-81c6-bea3c7d1f888'
    },
    name: {
      type: 'string',
      default: 'Nickão'
    },
    breed: {
      type: 'integer',
      default: 16
    },
    color: {
      type: 'string',
      default: 'preto'
    },
    type: {
      type: 'integer',
      default: 3
    },
    considerations: {
      type: 'string',
      default: 'orelhas bem sensíveis, necessário extremo cuidado com a região'
    }
  },
  required: ['id', 'name', 'breed', 'color', 'type']
}
