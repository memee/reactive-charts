import { curry } from 'ramda';

// eslint-disable-next-line no-unused-vars
const trace = curry((tag, x) => {
  // eslint-disable-next-line no-console, fp/no-unused-expression
  console.log(tag, x);
  return x;
});
