import { HashComparer, Hasher } from '@/data/interfaces/cryptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: Hasher.Params): Promise<Hasher.Result> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (data: HashComparer.Params): Promise<HashComparer.Result> {
    const { value, hash } = data
    const result = await bcrypt.compare(value, hash)
    return result
  }
}
