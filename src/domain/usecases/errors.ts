export class UseCaseError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "UseCaseError";
  }
}
