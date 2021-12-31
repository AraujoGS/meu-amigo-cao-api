import { Encrypter, Decrypter } from '@/data/interfaces/cryptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secretKey: string) {}

  encrypt (value: Encrypter.Params): Encrypter.Result {
    const accessToken = jwt.sign({ id: value }, this.secretKey, { expiresIn: '3h' })
    return accessToken
  }

  decrypt (value: Decrypter.Params): Decrypter.Result {
    const decryptedValue: any = jwt.verify(value, this.secretKey)
    return decryptedValue
  }
}
