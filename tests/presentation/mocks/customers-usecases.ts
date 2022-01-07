import { AddAddress } from '@/domain/usecases'

export class AddAddressSpy implements AddAddress {
  data: AddAddress.Params
  async add (data: AddAddress.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}
