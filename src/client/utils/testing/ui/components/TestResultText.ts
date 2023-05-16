import { TestResult } from "../../test-result";

export interface TestResultTextProps {
  result: TestResult;
}

export function TestResultText({
  result,
}: TestResultTextProps) {
  const titleClassName = result.success ? 'success' : 'failure'

  return (
    `<div class='test-body'>` +
    `<p class='test-title ${titleClassName}' >${result.title}</p>` +
    (result.message ? `<p class='test-fail-message'>${result.message}</p>` : '') +
    `</div>`
  );
}