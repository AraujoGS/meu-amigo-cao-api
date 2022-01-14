export const petsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '78b6ce57-0f1e-4b43-ae98-a0890d064e63'
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
