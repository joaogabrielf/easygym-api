export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Daily check-ins number has been reached already.')
  }
}
