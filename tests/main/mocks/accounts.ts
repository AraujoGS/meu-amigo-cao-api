import { PostgresHelper } from '@/infra/db'
import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { sign } from 'jsonwebtoken'

export const mockAddAccount = async (email?: string, phone?: string): Promise<void> => {
  const password = await hash('123', 12)
  const id = uuid()
  const query = `
  INSERT INTO CLIENTES(id_cliente, nome_cliente, senha_cliente, email_cliente, telefone_cliente, data_nascimento_cliente)
  VALUES ($1,$2,$3,$4,$5,$6)
  `
  const params = [id, 'Guilherme de Araujo', password, (email || 'guilhermearaujo421@gmail.com'), (phone || '11954976863'), '1997-05-30']
  await PostgresHelper.execute(query, params)
}

type Account = {
  id: string
  accessToken: string
}

export const mockGetAccountData = async (email?: string, phone?: string): Promise<Account> => {
  await mockAddAccount(email, phone)
  let query = 'SELECT id_cliente as id FROM CLIENTES WHERE email_cliente = $1'
  let params = [email || 'guilhermearaujo421@gmail.com']
  const result = await PostgresHelper.execute(query, params)
  const account = PostgresHelper.mapperOneResult(result)
  const accessToken = sign({ id: account.id }, process.env.JWT_SECRET)
  query = 'UPDATE CLIENTES SET token_acesso = $1 WHERE id_cliente = $2'
  params = [accessToken, account.id]
  await PostgresHelper.execute(query, params)
  return { id: account.id, accessToken }
}
