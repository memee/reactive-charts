/* @flow */
import * as R from 'ramda';
import * as d3 from 'd3';
import { type D3Selection } from 'd3';
import { IO } from '../io';


export const d3select = (selector: string): IO<D3Selection> => {
  return new IO(() => {
    return d3.select(selector);
  });
};


export const append = R.curry((selector: string, el: D3Selection): IO<D3Selection> => {
  return new IO(() => {
    return el.append(selector);
  });
});
