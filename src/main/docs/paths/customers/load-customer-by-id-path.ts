export const loadCustomerByIdPath = {
  get: {
    tags: ['Customers'],
    summary: 'API para consultar os dados do cliente',
    security: [{
      apiKeyAuth: []
    }],
    responses: {
      200: {
        description: 'Cliente retornado com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/customer'
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
