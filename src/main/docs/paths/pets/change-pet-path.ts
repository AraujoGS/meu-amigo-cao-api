export const changePetPath = {
  put: {
    tags: ['Customers'],
    summary: 'API para alterar o pet do cliente',
    security: [{
      apiKeyAuth: []
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/changePetParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Pet alterado com sucesso'
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
