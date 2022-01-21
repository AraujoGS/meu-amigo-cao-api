export const deletePetParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '55796dd3-16de-4852-81c6-bea3c7d1f888'
    }
  },
  required: ['id']
}
