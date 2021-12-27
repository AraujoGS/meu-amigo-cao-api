export const loginPath = {
  post: {
    tags: ['Account'],
    summary: 'API para autenticar contas de usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Criado com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/accountAuthenticated'
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
      500: {
        $ref: '#/components/internalServerError'
      }
    }
  }
}
