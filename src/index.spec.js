import test from 'tape';
import jsc from 'jsverify';

import { periodic, fromPromise, of } from 'most';

const sth = sth => sth;

test.skip('sth', function (t) {

  t.equal(sth('something'), 'something');
  t.end();
});

test.skip('sth', (t) => {
  t.plan(1);
  const additionIsCommunative = jsc.checkForall(
    jsc.integer, jsc.integer, (a, b) => a + b === b + a
  );

  t.equal(additionIsCommunative, true);
});

test('async', (t) => {
  t.plan(1);

  const stream1 = of().delay(2000).take(4).observe(stream2);

  console.log(window);

  const stream2 = fromPromise(fetch('http://localhost:3000/multibar-line'));

  setTimeout(() => t.end(), 2000);
});
