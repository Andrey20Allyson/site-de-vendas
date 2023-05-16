import { ExpectAPI, Expecter } from "./expect";
import { Test, TestAPI, TestCallback, TestListener } from "./test";
import { fail } from "./test-error";
import { TestResult } from "./test-result";

export interface TesterAPI {
  readonly test: TestAPI;
  readonly expect: ExpectAPI;
};

export type ResultChangedListener = (results: TestResult[]) => void;

export class Tester implements TesterAPI, TestListener {
  readonly test: TestAPI;
  readonly expect: ExpectAPI;
  private startTime: number;
  private lastResultTime: number;
  private results: TestResult[];
  private tests: Test[];
  private resultChangedListeners: ResultChangedListener[];

  constructor() {
    this.startTime = Date.now();
    this.results = [];
    this.tests = [];
    this.lastResultTime = this.startTime;
    this.resultChangedListeners = [];

    this.test = Test.createAPI(this.tests);
    this.expect = Expecter.createAPI(fail);
  }

  handleTestFinished(result: TestResult): void {
    this.lastResultTime = Date.now();

    this.results.push(result);

    for (const listener of this.resultChangedListeners) {
      listener(this.results);
    }
  }

  onResultChanged(listener: (results: TestResult[]) => void) {
    this.resultChangedListeners.push(listener);
  }

  getTimestamp(): number {
    return this.lastResultTime - this.startTime;
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