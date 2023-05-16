import { startReloader } from './dev-reload';
import { expect, test, tester } from './utils/testing';
import './utils/testing/testing.css';

startReloader({ isTest: true });

test('Ola mundo', () => {
  expect.fail('falhou :(');
});

tester.run();