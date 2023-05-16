export type FailFunction = (message: string) => never;

export class TestFailError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function fail(message: string): never {
  throw new TestFailError(message);
}