export const signUpPath = {
  post: {
    tags: ['Account'],
    summary: 'API para criar a conta do usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signUpParams'
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
