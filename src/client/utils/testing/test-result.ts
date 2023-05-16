import { TestFailError } from "./test-error";

export class TestResult {
  success: boolean;
  message: string;
  title: string;

  constructor(title: string) {
    this.message = '';
    this.success = true;
    this.title = title;
  }

  handleError(error: unknown) {
    if (!(error instanceof TestFailError)) throw error;

    this.message = error.message;
    this.success = false;
  }
}