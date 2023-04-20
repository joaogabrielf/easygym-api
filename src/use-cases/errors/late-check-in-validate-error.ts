export class LateCheckInValidateError extends Error {
  constructor() {
    super('Check can only be validate until 20 minutes of its creation')
  }
}
