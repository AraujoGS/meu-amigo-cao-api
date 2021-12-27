export const unauthorized = {
  description: 'Autenticação falhou, os dados informados estão incorretos',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
