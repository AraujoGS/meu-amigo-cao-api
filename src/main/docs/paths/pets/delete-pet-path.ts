export const deletePetPath = {
  delete: {
    tags: ['Customers'],
    summary: 'API para deletar um pet do cliente',
    security: [{
      apiKeyAuth: []
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/deletePetParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Pet deletado com sucesso'
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
