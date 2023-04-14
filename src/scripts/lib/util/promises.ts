export class TimeoutError extends Error {
  constructor(public timeout: number) {
    super(`the timeout of ${timeout} ended`);
  }
}

export function createTimeoutError(timeout: number) {
  const error = new TimeoutError(timeout);

  return new Promise<never>((res, rej) => setTimeout(() => rej(error), timeout));
}