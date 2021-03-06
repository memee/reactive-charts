/* @flow */

/* IO monad based on that from monet.js. Modified to be more inlined with Folktale datatypes and
 * classed to be easier to use with flow type system */
/*
The MIT License (MIT)

Copyright (c) 2016 Chris Myers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
/* eslint-disable fp/no-this, fp/no-nil, fp/no-mutation, fp/no-throw */
import F from 'functional';


// Here we're against fp rules but we're preparing Monad which we would eventually
// had to do sugar-less style with violating fp/no-this, fp/no-nil, fp/no-mutation.
// And with class we get better flow-type support
/* eslint-disable fp/no-class, fp/no-this, fp/no-nil, fp/no-mutation, fp/no-throw */
export class IO<T> {
  effectFn: () => T;

  chain: any;
  perform: any;
  performUnsafeIO: any;

  constructor(effectFn: () => T) {
    if (!F.is(Function, effectFn))
      throw 'IO Requires a function';
    this.effectFn = effectFn;
  }

  map(fn: any): IO<T> {
    return new IO(() => {
      return fn(this.effectFn());
    });
  }

  bind(fn: any): IO<T> {
    return new IO(() => {
      return fn(this.effectFn()).run();
    });
  }

  ap(ioWithFn: any) {
    return ioWithFn.map(fn => fn(this.effectFn()));
  }

  run() {
    return this.effectFn();
  }
}

IO.prototype.perform = IO.prototype.performUnsafeIO = IO.prototype.run;
IO.prototype.chain = IO.prototype.bind;
// $FlowFixMe
IO.prototype['fantasy-land/chain'] = IO.prototype.chain;
// $FlowFixMe
IO.prototype['fantasy-land/ap'] = IO.prototype.ap;
// $FlowFixMe
IO.prototype['fantasy-land/map'] = IO.prototype.map;
