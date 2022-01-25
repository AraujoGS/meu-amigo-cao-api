export const addAppointmentParamsSchema = {
  type: 'object',
  properties: {
    petId: {
      type: 'string',
      default: '55796dd3-16de-4852-81c6-bea3c7d1f888'
    },
    service: {
      type: 'integer',
      default: 1
    },
    date: {
      type: 'string',
      default: '2027-01-25 14:30:00'
    },
    observations: {
      type: 'string',
      default: 'Colocar algodão nos ouvidos, são muito sensíveis.'
    }
  },
  required: ['petId', 'service', 'date']
}
