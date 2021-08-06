export default class RateLimitError extends Error {
  constructor() {
    super(`Rate limit exceeded. Please slow down before continuing.`);
    this.name = 'RateLimitError';
  }
}
