import { DriverDb } from '@/infra/db/interfaces'
import { AddAccountRepository } from '@/data/interfaces/db'
import { IdentifierGenerator } from '@/data/interfaces/utils'

export class AddAccountPostgresRepository implements AddAccountRepository {
  constructor (
    private readonly db: DriverDb,
    private readonly identifierGenerator: IdentifierGenerator
  ) {}

  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const query = `
    INSERT INTO CLIENTES(id_cliente, nome_cliente, senha_cliente, email_cliente, telefone_cliente, data_nascimento_cliente)
    VALUES ($1,$2,$3,$4,$5,$6)
    `
    const { name, password, email, phone, birthDate } = data
    const id = this.identifierGenerator.generate()
    const params = [id, name, password, email, phone, birthDate]
    const result = await this.db.execute(query, params)
    return result.rowCount !== 0
  }
}
