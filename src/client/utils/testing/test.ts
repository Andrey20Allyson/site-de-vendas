import { TestResult } from "./test-result";

export type TestCallback = () => unknown;
export type TestAPI = (title: string, callback: TestCallback) => Test;

export interface Stack<T> {
  push(item: T): void;
}

export interface TestListener {
  handleTestFinished(result: TestResult): void;
}

export class Test {
  title: string;
  callback: TestCallback;

  constructor(title: string, callback: TestCallback) {
    this.callback = callback;
    this.title = title;
  }

  static createAPI(testStack: Stack<Test>): TestAPI {
    return (title: string, callback: TestCallback) => {
      const test = new Test(title, callback);

      testStack.push(test);

      return test;
    }
  }

  async execute(listener?: TestListener) {
    let result = new TestResult(this.title);

    try {
      const promise = this.callback();

      if (promise instanceof Promise) await promise;
    } catch (error) {
      result.handleError(error);
    }

    listener?.handleTestFinished(result);

    return result;
  }
}