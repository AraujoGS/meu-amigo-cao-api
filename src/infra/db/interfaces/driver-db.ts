export interface DriverDb {
  connect: (uri?: string) => Promise<void>
  disconnect: () => Promise<void>
  execute: (query: string, params?: any[]) => Promise<any>
}
