export const AddPetParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      default: 'Nick'
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
      default: 2
    },
    considerations: {
      type: 'string',
      default: 'orelhas bem sensíveis, necessário extremo cuidado com a região'
    }
  },
  required: ['name', 'breed', 'color', 'type']
}
