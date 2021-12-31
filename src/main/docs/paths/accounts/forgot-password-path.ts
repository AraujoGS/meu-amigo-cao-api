export const forgotPasswordPath = {
  post: {
    tags: ['Account'],
    summary: 'API para recuperar a senha do usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/forgotPasswordParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Email de recuperação enviado com sucesso'
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
