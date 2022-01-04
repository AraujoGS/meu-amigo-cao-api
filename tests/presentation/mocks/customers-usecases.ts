import { AddAddress } from '@/domain/usecases'

export class AddAddressSpy implements AddAddress {
  data: AddAddress.Params
  result = true
  async add (data: AddAddress.Params): Promise<AddAddress.Result> {
    this.data = data
    return this.result
  }
}
