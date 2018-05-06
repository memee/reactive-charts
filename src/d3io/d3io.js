/* @flow */
import S from 's';
import * as d3 from 'd3';
import { type D3Selection } from 'd3';
import { IO } from '../io';


export const d3select = (selector: string): IO<D3Selection> => {
  return new IO(() => {
    return d3.select(selector);
  });
};


export const append = S.curry2((selector: string, el: D3Selection): IO<D3Selection> => {
  return new IO(() => {
    return el.append(selector);
  });
});
