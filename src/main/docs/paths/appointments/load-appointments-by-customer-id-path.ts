export const loadAppointmentsByCustomerIdPath = {
  get: {
    tags: ['Customers'],
    summary: 'API para consultar os agendamentos do cliente',
    security: [{
      apiKeyAuth: []
    }],
    parameters: [
      {
        name: 'offset',
        in: 'query',
        required: false,
        default: 1,
        schema: {
          type: 'integer',
          minimum: 1
        }
      },
      {
        name: 'limit',
        in: 'query',
        required: false,
        default: 10,
        schema: {
          type: 'integer',
          minimum: 1
        }
      }
    ],
    responses: {
      200: {
        description: 'Agendamentos retornados com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/appointment'
            }
          }
        }
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/internalServerError'
      }
    }
  }
}
