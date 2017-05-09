import { chain, compose } from 'ramda';
import { d3select, append } from './d3io/d3io';


const renderSVG = compose(chain(append('svg')), d3select);

export const chart = (components, layout, data) => {} // eslint-disable-line

export const render = (selector) => {
  return (chart) => { // eslint-disable-line
    return renderSVG(selector).perform();
  };
};
