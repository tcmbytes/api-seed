interface Params {}

export const setupProcessListeners = (params: Params) => {
  process.on('unhandledRejection', () => {
    process.exit(1)
  })

  process.on('uncaughtException', () => {
    process.exit(1)
  })
}
