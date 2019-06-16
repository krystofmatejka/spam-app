export interface ILogger {

  debug (message: string): void

  info (message: string): void

  warn (message: string): void

  error (message: string): void

  fatal (message: string): void
}
