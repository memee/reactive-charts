import test from 'tape';
import jsc from 'jsverify';

const sth = sth => sth;

test('sth', function (t) {

  t.equal(sth('something'), 'something');
  t.end();
});

test('sth', (t) => {
  t.plan(1);
  const additionIsCommunative = jsc.checkForall(
    jsc.integer, jsc.integer, (a, b) => a + b === b + a
  );

  t.equal(additionIsCommunative, true);
});
