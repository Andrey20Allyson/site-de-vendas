import { TestResult } from "../../test-result";
import { TestResultText } from "./TestResultText";

export interface TestDisplayProps {
  results: TestResult[];
  timestamp: number;
}

export function TestDisplay({
  timestamp,
  results,
}: TestDisplayProps) {
  const mainDiv = document.getElementById('main');
  if (!mainDiv) throw new Error(`Main div not found!`);

  mainDiv.innerHTML = results.map(result => {
    return TestResultText({ result });
  }).join('');

  mainDiv.innerHTML += `<p>Finished in ${timestamp} ms</p>`;
}

