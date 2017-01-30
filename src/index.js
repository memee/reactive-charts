/* @flow */

import * as R from 'ramda';
import * as d3 from 'd3';

import { IO } from './io';

// eslint-disable-next-line no-unused-vars
const render = (chart) => {
  return new IO(() => {
    return 'nothing';
  });
};


const data = [
  { date: '2014-01-01', amount: 10 },
  { date: '2014-02-01', amount: 20 },
  { date: '2014-03-01', amount: 40 },
  { date: '2014-04-01', amount: 80 }
];

const x = d3.scaleLinear()
  .domain(d3.extent(data, R.prop('amount')))
  .range([0, 200]);

const xAxis = d3.axisBottom(x)
  .ticks(4);

const svg = d3.select('body')
  .append('svg')        // create an <svg> element
  .attr('width', 300) // set its dimentions
  .attr('height', 150);

/* eslint-disable */
svg.append('g')            // create a <g> element
  .attr('class', 'x axis') // specify classes
  .call(xAxis);
