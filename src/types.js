/* @flow */

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

interface IBarComponent extends IComponent, ICartesianComponent {
  type: 'bar'
}

interface ILineComponent extends IComponent {
  type: 'line'
}

export interface ILayout {
  barmode ? : 'stack' | 'group';
  xAxis ? : any;
  yAxis ? : any;
  showLegend ? : boolean;
}

interface IDataOptions {
  url: string,
  interval: number
}

// could be ws url, Promise or options
export type IData = string | Promise<any> | IDataOptions;
