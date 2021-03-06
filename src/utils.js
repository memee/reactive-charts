import F from 'functional';

// eslint-disable-next-line no-unused-vars
const trace = F.curry2((tag, x) => {
  // eslint-disable-next-line no-console, fp/no-unused-expression
  console.log(tag, x);
  return x;
});
