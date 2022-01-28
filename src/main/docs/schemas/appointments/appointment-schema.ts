export const appointmentsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        default: 'b9c36645-0556-46a2-bc44-f1875df74696'
      },
      petName: {
        type: 'string',
        default: 'Nickão'
      },
      service: {
        type: 'string',
        default: 'BANHO E TOSA'
      },
      date: {
        type: 'string',
        default: '2027-01-25 00:00:00'
      },
      observations: {
        type: 'string',
        default: 'Colocar algodão nos ouvidos, são muito sensíveis.'
      },
      cancellation: {
        type: 'boolean',
        default: false
      }
    }
  }
}
