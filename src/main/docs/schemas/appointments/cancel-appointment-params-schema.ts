export const cancelAppointmentParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: 'd4ebcacb-8c6b-4a62-8124-965f8dd08b4a'
    }
  },
  required: ['id']
}
