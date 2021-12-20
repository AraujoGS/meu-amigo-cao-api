import { Encrypter } from '@/data/interfaces/cryptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secretKey: string) {}
  encrypt (value: Encrypter.Params): Encrypter.Result {
    const accessToken = jwt.sign({ id: value }, this.secretKey, { expiresIn: '3h' })
    return accessToken
  }
}
