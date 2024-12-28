export class PerplexityError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'PerplexityError';
    this.status = status;
  }
}