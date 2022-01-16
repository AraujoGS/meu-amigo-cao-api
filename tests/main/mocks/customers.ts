import { PostgresHelper } from '@/infra/db'
import { v4 as uuid } from 'uuid'

export const mockAddAddress = async (accountId: string): Promise<string> => {
  const payload = {
    zipcode: '03086090',
    address: 'Rua Leonardo da Silva',
    city: 'São Paulo',
    number: 100,
    district: 'Parque São Jorge',
    state: 'SP',
    complement: 'casa'
  }
  const id = uuid()
  const query = `
    INSERT INTO ENDERECOS(
      id_endereco,
      id_cliente, 
      cep, 
      logradouro, 
      cidade, 
      bairro,
      numero,
      uf,
      complemento  
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `
  const { zipcode, address, city, district, number, state, complement } = payload
  const params = [id, accountId, zipcode, address, city, district, number, state, complement]
  await PostgresHelper.execute(query, params)
  return id
}
