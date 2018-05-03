/* eslint-disable */
import { fromPromise } from 'most';

const SECOND = 1000;

const RC = window.reactiveCharts;

const chart = RC.chart([{
  label: 'abc',
  values: datum => datum[0].values
}], {
  barmode: 'stack'
}, {
  url: 'http://localhost:3000/multibar-line',
  initialUrl: '?history_length=10',
  interval: 5 * SECOND
});

const render = RC.render('body');

render(chart);

// testing
