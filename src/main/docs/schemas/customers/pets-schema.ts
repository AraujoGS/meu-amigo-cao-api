export const petsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '55796dd3-16de-4852-81c6-bea3c7d1f888'
    },
    name: {
      type: 'string',
      default: 'Nick'
    },
    breed: {
      type: 'string',
      default: 'Cocker spaniel inglês'
    },
    color: {
      type: 'string',
      default: 'preto'
    },
    type: {
      type: 'string',
      default: 'PEQUENO'
    },
    considerations: {
      type: 'string',
      default: 'orelhas bem sensíveis, necessário extremo cuidado com a região'
    }
  }
}
