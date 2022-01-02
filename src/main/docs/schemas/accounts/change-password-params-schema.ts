export const changePasswordParamsSchema = {
  type: 'object',
  properties: {
    oldPassword: {
      type: 'string',
      default: '123'
    },
    oldPasswordConfirmation: {
      type: 'string',
      default: '123'
    },
    newPassword: {
      type: 'string',
      default: '123Alterado'
    }
  },
  required: ['oldPassword', 'oldPasswordConfirmation', 'newPassword']
}
