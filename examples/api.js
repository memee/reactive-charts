#!/usr/bin/env node
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

  const HISTORY_LENGTH = parseInt(req.query.history_length || 0);
  const FORECAST_HORIZON = 4;
  const INTERVAL = 5;
  const NOW = new Date();

  const backInHistory = -HISTORY_LENGTH * INTERVAL;
  const forecastLength = HISTORY_LENGTH > FORECAST_HORIZON ?
    FORECAST_HORIZON : HISTORY_LENGTH;

  const createTimeSerie = R.curry((valueFunc, dt) => [dt, valueFunc()]);
  const createTimeRandomValueSerie = createTimeSerie(
    () => chance.floating({min: 0, max: 10**5})
  );

  const setSeconds = R.curry(
    (addOrSubtract, num, dt) => new Date(
      new Date(dt).setSeconds(addOrSubtract(new Date(dt).getSeconds(), num))
    )
  );
  const addSeconds = setSeconds(R.add);
  const subtractSeconds = setSeconds(R.subtract);
  const addInterval = addSeconds(INTERVAL);
  const subtractInterval = subtractSeconds(INTERVAL);
  const negativeInterval = addSeconds(backInHistory, NOW);
  const prevDate = R.curry((prevFn, prevArr) => prevFn(prevArr)[0]);

  const costReducer = R.reduce(
    (prev) => R.append(randomSerieFromLast(prev), prev)
  );
  // reduceRight iterator have different params order
  const forecastReducer = R.reduceRight(
    (_, prev) => R.prepend(randomSerieFromFirst(prev), prev)
  );

  const randomSerieFromLast = R.compose(
    createTimeRandomValueSerie,
    addInterval,
    prevDate(R.last)
  );

  const randomSerieFromFirst = R.compose(
    createTimeRandomValueSerie,
    subtractInterval,
    prevDate(R.head)
  );

  const forecastHorizonInterval = addSeconds(FORECAST_HORIZON * INTERVAL, NOW);

  const data = [
    {
      key: 'Cost',
      bar: true,
      values: costReducer(
        [createTimeRandomValueSerie(negativeInterval)], range(HISTORY_LENGTH)
      )
    },
    {
      key: 'Forecast',
      bar: true,
      values: forecastReducer(
        [createTimeRandomValueSerie(forecastHorizonInterval)], range(forecastLength - 1)
      )
    },
    {
      key: 'Budget',
      values: costReducer()
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
