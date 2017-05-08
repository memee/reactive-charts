/* eslint-disable fp/no-unused-expression, fp/no-nil, fp/no-mutation, no-console */
const Chance = require('chance');
const R = require('ramda');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router();
const middlewares = jsonServer.defaults();

const chance = new Chance();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/multibar-line', (req, res) => {
  const range = length => Array.apply(undefined, {length: length});

  const INTERVAL = 5;
  const NOW = new Date();

  const createTimeSerie = R.curry((valueFunc, dt) => [dt, valueFunc()]);
  const createTimeRandomValueSerie = createTimeSerie(() => chance.floating({min: 0, max: 10**5}));

  const addSecond = R.curry((num, dt) => new Date(new Date(dt).setSeconds(new Date(dt).getSeconds()+num)));
  const plusSecondInterval = addSecond(INTERVAL);
  const prevDate = prevArr => prevArr.slice(-1)[0][0];
  const valuesReducer =
    R.reduce((prev) => [...prev, createTimeRandomValueSerie(plusSecondInterval(prevDate(prev)))]);

  const data = [
    {
      key: 'Cost',
      bar: true,
      values: valuesReducer([createTimeRandomValueSerie(addSecond(-11 * INTERVAL, NOW))], range(10))
    },
    {
      key: 'Forecast',
      bar: true,
      values: valuesReducer([createTimeRandomValueSerie(NOW)], range(4))
    },
    {
      key: 'Budget',
      values: valuesReducer()
    }
  ];

  res.jsonp(data);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
