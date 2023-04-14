import { bundle } from './lib/builder';

type Result = Awaited<ReturnType<typeof bundle>>;

function onBundled(result: Result) {
  console.log('builded with success!');
}

bundle().then(onBundled);