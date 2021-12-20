import { UuidAdapter } from '@/infra/utils'
import faker from 'faker'

const fakeUuid = faker.datatype.uuid()

jest.mock('uuid', () => ({
  v4 (): string { return fakeUuid }
}))

const makeSut = (): UuidAdapter => {
  return new UuidAdapter()
}

describe('UUID Adapter', () => {
  test('should UuidAdapter generate unique identifier valid', () => {
    const sut = makeSut()
    const uuid = sut.generate()
    expect(uuid).toBe(fakeUuid)
  })
})
