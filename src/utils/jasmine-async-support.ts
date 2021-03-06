/**
 * when using typescript async/await, awaiter wraps your function body and catches every exceptions.
 * so this adapter returns a function which invokes 'done' / 'done.fail' after the promise settled.
 *
 * example)
 *
 * import spec = island.spec;
 *
 * it('is a spec using async function', spec(async () => {
 *   await rejectSomething();
 * }));
 */

export function jasmineAsyncAdapter(assertion: () => Promise<void>) {
  // tslint:disable-next-line
  return function (done) {
    assertion.call(this).then(done, done.fail);
  };
}

export function createSpyObjWithAllMethods<T>(ctor: new (...args) => T): T {
  const methods = Object.getOwnPropertyNames(ctor.prototype)
    .filter(name => name !== 'constructor');

  if (!methods || methods.length === 0) {
    return {} as T;
  }

  return jasmine.createSpyObj(ctor.name, methods);
}

export function resetSpyObjWithCallsCount(obj): void {
  const methods = Object.getOwnPropertyNames(obj)
    .filter(name => name !== 'constructor');

  if (!methods || methods.length === 0) {
    return;
  }

  for (const method of methods) {
    (obj[method] as jasmine.Spy).calls.reset();
  }
}
