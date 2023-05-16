import { TestResultText } from "./ui/components/TestResultText";
import { Expecter } from "./expect";
import { Test, TestCallback } from "./test";
import { fail } from "./test-error";
import { TestResult } from "./test-result";

export function testFactory() {
  const tests: Test[] = [];
  const testResults: TestResult[] = [];
  const initTime = Date.now();

  let lastTestTime = Date.now();

  function expect<V = unknown>(value: V) {
    return new Expecter(value, expect.fail);
  }

  expect.fail = fail;

  function test(title: string, callback: TestCallback) {
    const test = new Test(title, callback);

    tests.push(test);

    return test;
  }

  function addResult(result: TestResult) {
    lastTestTime = Date.now();

    testResults.push(result);

    show();
  }

  function run() {
    for (const test of tests) {
      test.execute().then(addResult);
    }
  }

  function show() {
    const mainDiv = document.getElementById('main');
    if (!mainDiv) throw new Error(`Main div not found!`);

    mainDiv.innerHTML = testResults.map(result => {
      return TestResultText({ result });
    }
    ).join('');

    mainDiv.innerHTML += `<p>Finished in ${lastTestTime - initTime} ms</p>`;
  }

  return { expect, test, run };
}

export const { expect, run, test } = testFactory();