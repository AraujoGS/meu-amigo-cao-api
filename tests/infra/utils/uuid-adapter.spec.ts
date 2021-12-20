import { UuidAdapter } from '@/infra/utils'
import uuid from 'uuid'
import faker from 'faker'

const fakeUuid = faker.datatype.uuid()

jest.mock('uuid', () => ({
  v4 (): string { return fakeUuid }
}))

const makeSut = (): UuidAdapter => {
  return new UuidAdapter()
}

describe('UUID Adapter', () => {
  test('should UuidAdapter call uuid correctly', () => {
    const sut = makeSut()
    const uuidSpy = jest.spyOn(uuid, 'v4')
    sut.generate()
    expect(uuidSpy).toHaveBeenCalled()
  })
  test('should UuidAdapter generate unique identifier valid', () => {
    const sut = makeSut()
    const uuid = sut.generate()
    expect(uuid).toBe(fakeUuid)
  })
})
