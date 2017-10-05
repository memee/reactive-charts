/* @flow */
/**
 * Idea for whole interface was taken from plotly.js
 */

type ICartesianData = [string, number];

export interface IFunctor<T> {
  map<U> (f: (t: T) => U): IFunctor<U> ;
}

export interface IComponent {
  label: string | (datum: any) => string;
  tooltip: [string] | (datum: any) => string;
  values ? : string | (datum: any) => [any];
}

interface ICartesianComponent {
  x: ICartesianData | (datum: any) => string | number;
  y: ICartesianData | (datum: any) => string | number;
}

export interface IBarComponent extends IComponent, ICartesianComponent {
  type: 'bar'
}

export interface ILineComponent extends IComponent {
  type: 'line'
}

/**
 * This holds the configuration of how data is displayed on a chart, like:
 * x/y axis label, scale type; barmode;
 */
export interface ILayout {
  barmode ? : 'stack' | 'group';
  xAxis ? : any;
  yAxis ? : any;
  showLegend ? : boolean;
}

interface IDataOptions {
  url: string,
  initialUrl?: string,
  interval: number
}

// could be ws url, Promise or options
export type IData = string | Promise<any> | IDataOptions;
