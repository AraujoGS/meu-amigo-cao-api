import { Hasher } from '@/data/interfaces/cryptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  async hash (value: Hasher.Params): Promise<Hasher.Result> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
