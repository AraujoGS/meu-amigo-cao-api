export const preconditionFailed = {
  description: 'Erro em alguma regra de negócio',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
