import { Renderer } from "../../ui/renderer";
import { TestResult } from "../test-result";

export interface TestResultTextProps {
  result: TestResult;
}

export function TestResultText({
  result,
}: TestResultTextProps) {
  const titleClassName = result.success ? 'success' : 'failure'

  return Renderer.createElement('div', {
    className: 'test-body',
    children: [
      Renderer.createElement('p', {
        className: `test-title ${titleClassName}`,
        children: result.title,
      }),
      result.message && Renderer.createElement('p', {
        className: 'test-fail-message',
        children: result.message
      }),
    ]
  });
}