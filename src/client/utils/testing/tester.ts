import { ExpectAPI, Expecter } from "./expect";
import { Test, TestAPI, TestCallback, TestListener } from "./test";
import { fail } from "./test-error";
import { TestResult } from "./test-result";

export interface TesterAPI {
  readonly test: TestAPI;
  readonly expect: ExpectAPI;
};

export class Tester implements TesterAPI, TestListener {
  readonly test: TestAPI;
  readonly expect: ExpectAPI;
  private startTime: number;
  private results: TestResult[];
  private tests: Test[];

  constructor() {
    this.startTime = Date.now();
    this.results = [];
    this.tests = [];

    this.test = Test.createAPI(this.tests);
    this.expect = Expecter.createAPI(fail);
  }

  onTestFinished(result: TestResult): void {
    this.results.push(result);
  }

  getAPI(): TesterAPI {
    return this;
  }

  run() {
    for (const test of this.tests) {
      test.execute(this);
    }
  }
}