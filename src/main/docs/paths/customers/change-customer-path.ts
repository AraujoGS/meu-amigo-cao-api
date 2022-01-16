export const changeCustomerPath = {
  put: {
    tags: ['Customers'],
    summary: 'API para alterar os dados do cliente',
    security: [{
      apiKeyAuth: []
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/changeCustomerParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Cliente alterado com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/customer'
            }
          }
        }
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
