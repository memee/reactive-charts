import test from 'tape';

const sth = sth => sth;

test('noop', function(t){

  t.equal(sth('something'), 'something');
  t.end();
});
