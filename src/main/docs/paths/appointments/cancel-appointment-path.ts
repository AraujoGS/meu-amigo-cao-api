export const cancelAppointmentPath = {
  post: {
    tags: ['Customers'],
    summary: 'API para cancelar um agendamento do cliente',
    security: [{
      apiKeyAuth: []
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/cancelAppointmentParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Agendamento cancelado com sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
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
      412: {
        $ref: '#/components/preconditionFailed'
      },
      500: {
        $ref: '#/components/internalServerError'
      }
    }
  }
}
