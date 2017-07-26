// @flow

import { chain, compose } from 'ramda';
import { d3select, append } from './d3io/d3io';

import type { IComponent, ILayout, IData, IFunctor } from './types';


const renderSVG = compose(chain(append('svg')), d3select);

// FIXME
/* eslint-disable */
export const chart = (
    components: IComponent[],
    layout: ILayout,
    dataOrOptions: IData
    // $FlowFixMe
): IFunctor<any> => {

}

// A `render` function should return a function that'll take chart function as an
// argument and perform all necessary IO.
export const render = (selector: string): ((IFunctor<any> ) => void) => {
  return (chart) => { // eslint-disable-line
    return renderSVG(selector).perform();
  };
};
