import { ActionResult } from '@/domain/models'

export namespace ChangeCustomer {
  export type Params = {
    id: string
    name: string
    email: string
    phone: string
    birthDate: Date
  }
  export type Result = ActionResult
}

export interface ChangeCustomer {
  change: (data: ChangeCustomer.Params) => Promise<ActionResult>
}
