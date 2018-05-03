/** @author Brian Cavalier */
/** taken from private gist */
/* eslint-disable */

// @flow
import { Stream, type Sink, type Scheduler, type Disposable } from 'most';

// Minimalist XHR stream
// Provide a function to setup the XHR however
// you want/need, but don't call send().  The returned
// stream will call send(), handle XHR events, and
// call abort() if necessary.
// The returned Stream will contain at most 1 events:
// the ProgressEvent emitted by XHR's 'load' OR 'error'
// event.  You can detect errors and turn them into
// Stream failures using chain() if you need.
// xhrStream(...).chain(progressEvent =>
//   progressEvent.type === 'error'
//     ? throwError(new Error(...))
//     : just(event)
export const xhrStream = (createXHR: () => XMLHttpRequest): Stream<ProgressEvent> =>
  new Stream(new XHRSource(createXHR));

/* eslint-disable fp/no-class, fp/no-nil, fp/no-this, fp/no-mutation */
class XHRSource {
  createXHR: () => XMLHttpRequest

  constructor (createXHR: () => XMLHttpRequest) {
    this.createXHR = createXHR;
  }

  run (sink: Sink<ProgressEvent>, scheduler: Scheduler): Disposable<*> {
    return handleXHR(this.createXHR(), sink, scheduler);
  }
}

const handleXHR = (xhr: XMLHttpRequest, sink: Sink<ProgressEvent>, scheduler: Scheduler): Disposable<*> => {
  const handler: ProgressEventHandler = event => {
    const time = scheduler.now();
    /* eslint-disable fp/no-unused-expression */
    sink.event(time, event);
    sink.end(time);
  };

  xhr.addEventListener('load', handler);
  xhr.addEventListener('error', handler);
  xhr.addEventListener('timeout', handler);

  xhr.send();

  return {
    dispose: () => xhr.abort()
  };
};
