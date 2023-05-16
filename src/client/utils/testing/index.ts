import { Renderer } from "../ui/renderer";
import { TestDisplay } from "./components/TestDisplay";
import { Tester } from "./tester";

const throwError = (error: unknown) => { throw error };

const root = document.getElementById('root') ?? throwError(new Error('Can\'t find element #root'));
const renderer = new Renderer(root);

renderer.render(Renderer.createElement(TestDisplay, { results: [], timestamp: 0 }));

export const tester = new Tester();
tester.onResultChanged(results => {
  const timestamp = tester.getTimestamp();

  renderer.render(Renderer.createElement(TestDisplay, { results, timestamp }));
});

export const { expect, test } = tester.getAPI();