/* eslint-disable */

import { chain, curry, compose, map } from 'ramda';

import { IO } from './io';
import { d3select, append } from './d3io/d3io';


const render = compose(chain(append('svg')), d3select);

// render('body').perform();

export const chart = (components, layout, data) => {

}

// Use it!
const newChart = chart({

})


// const data = [
//   { date: '2014-01-01', amount: 10 },
//   { date: '2014-02-01', amount: 20 },
//   { date: '2014-03-01', amount: 40 },
//   { date: '2014-04-01', amount: 80 }
// ];
//
// const x = d3.scaleLinear()
//   .domain(d3.extent(data, R.prop('amount')))
//   .range([0, 200]);
//
// const xAxis = d3.axisBottom(x)
//   .ticks(4);
//
// const svg = d3.select('body')
//   .append('svg')        // create an <svg> element
//   .attr('width', 300) // set its dimentions
//   .attr('height', 150);
//
// /* eslint-disable */
// svg.append('g')            // create a <g> element
//   .attr('class', 'x axis') // specify classes
//   .call(xAxis);
