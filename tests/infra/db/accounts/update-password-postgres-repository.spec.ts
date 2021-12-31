import { PostgresHelper, UpdatePasswordPostgresRepository } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'

const makeSut = (): UpdatePasswordPostgresRepository => new UpdatePasswordPostgresRepository()
const getHashSenha = async (id: string): Promise<any> => {
  const response = await PostgresHelper.execute('SELECT senha_cliente as password FROM CLIENTES WHERE id_cliente = $1', [id])
  return response?.rows[0]
}

describe('Update Password Postgres Repository', () => {
  beforeAll(async () => {
    await PostgresHelper.connect(createDbTest())
    await PostgresHelper.execute(sqlCreateDb)
  })

  beforeEach(async () => {
    await PostgresHelper.execute(sqlClearDb)
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  it('should UpdatePasswordPostgresRepository update password with success', async () => {
    const params = await mockAccount()
    const beforeUserPassword = await getHashSenha(params.id)
    expect(beforeUserPassword.password).toBeTruthy()
    const sut = makeSut()
    await sut.updatePassword({
      email: params.email,
      password: 'nova_senha'
    })
    const afterUserPassword = await getHashSenha(params.id)
    expect(afterUserPassword.password).toBeTruthy()
    expect(afterUserPassword.password).not.toBe(beforeUserPassword.password)
  })
})
