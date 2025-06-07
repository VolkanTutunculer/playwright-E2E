import { test } from '../fixtures/hello';

test('Testing My Custom Fixture', async({ hello }) => {
  console.log(hello);
});