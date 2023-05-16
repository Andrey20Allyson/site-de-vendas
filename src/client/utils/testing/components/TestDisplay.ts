import { Renderer } from "../../ui/renderer";
import { TestResult } from "../test-result";
import { TestResultText } from "./TestResultText";

export interface TestDisplayProps {
  results: TestResult[];
  timestamp: number;
}

export function TestDisplay({
  timestamp,
  results,
}: TestDisplayProps) {
  const elements = results.map(result => Renderer.createElement(TestResultText, { result }));

  return Renderer.createElement('div', {
    children: [
      ...elements,
      Renderer.createElement('p', {
        children: `Finished in ${timestamp} ms`,
      }),
    ],
  });

  // mainDiv.innerHTML += `<p>Finished in ${timestamp} ms</p>`;
}

