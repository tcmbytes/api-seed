export interface Context {
  traceID: string
}

export interface Logger {
  info: (title: string, details?: object) => void
  error: (title: string, details?: object) => void
}
