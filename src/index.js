// @flow
import * as d3 from 'd3';
import * as most from 'most';

import S from 's';

import { d3select, append } from './d3io/d3io';
import { xhrStream } from './network/xhrStream';

import type { IComponent, ILayout, IData, IFunctor } from './types';


const renderSVG = S.compose(S.chain(append('svg')), d3select);

const POLL_INTERVAL = 1000;
const API_URL = 'https://sleepy-lake-61171.herokuapp.com/multibar-line';

const retry = (n, stream) =>
  most.recoverWith(
    e => n <= 0 ? most.throwError(e) : retry(n - 1, stream), stream
  );

const getJSON = (url) => xhrStream(() => {
  const xhr = new XMLHttpRequest();
  /* eslint-disable fp/no-unused-expression, fp/no-mutation */
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  /* eslint-enable */
  return xhr;
});

const getNext = (url, interval) =>
  getJSON(url)
    .delay(interval)
    .continueWith(() => getNext(url, interval)); // recursion

// 'http://localhost:3000/multibar-line'
//

// eslint-disable-next-line no-console
const consume = (it) => console.log(it);

/* eslint-disable */
getNext(API_URL, POLL_INTERVAL)
  .take(5)
  .observe(consume)
  .catch(console.error);


// FIXME
/* eslint-disable */
export const chart = (
  components: IComponent[],
  layout: ILayout,
  dataOrOptions: IData
  // $FlowFixMe
): IFunctor<any> => {
  // set the ranges
  const x = d3.scaleTime().range([0, 500]);
  const y = d3.scaleLinear().range([300, 0]);
}

// A `render` function should return a function that'll take chart function as an
// argument and perform all necessary IO.
export const render = (selector: string): ((IFunctor<any> ) => void) => {
  return (chart) => { // eslint-disable-line
    return renderSVG(selector).perform();
  };
};
