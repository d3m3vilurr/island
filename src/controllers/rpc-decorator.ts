import * as _ from 'lodash';

import { FatalError, ISLAND } from '../utils/error';

export interface RpcOptions {
  version?: string;
  schema?: RpcSchemaOptions;
  developmentOnly?: boolean;
}

export interface RpcSchemaOptions {
  query?: {
    sanitization: any;
    validation: any;
  };
  result?: {
    sanitization: any;
    validation: any;
  };
}

interface Rpc {
  name: string;
  options: RpcOptions;
  handler: (req) => Promise<any>;
}

function pushSafe(object, arrayName, element) {
  const array = object[arrayName] = object[arrayName] || [];
  array.push(element);
}

export function rpc(rpcOptions?: RpcOptions) {
  return (target, name, desc: PropertyDescriptor) => {
    const handler = desc.value;
    const options = _.merge({}, handler.options || {}, rpcOptions) as RpcOptions;
    const endpoint = { name, options, handler };
    pushSafe(handler, 'endpoints', endpoint);

    const constructor = target.constructor;
    pushSafe(constructor, '_endpointMethods', endpoint);
  };
}

export function rpcController(registerer?: {registerRpc: (name: string, value: any) => Promise<any>}) {
  return target => {
    const _onInitialized = target.prototype.onInitialized;
    // tslint:disable-next-line
    target.prototype.onInitialized = async function () {
      await Promise.all(_.map(target._endpointMethods, (v: Rpc) => {
        const developmentOnly = _.get(v, 'options.developmentOnly');
        if (developmentOnly && process.env.NODE_ENV !== 'development') return Promise.resolve();

        return this.server.register(v.name, v.handler.bind(this), 'rpc', v.options).then(() => {
          return registerer && registerer.registerRpc(v.name, v.options || {}) || Promise.resolve();
        }).catch(e => {
          throw new FatalError(ISLAND.FATAL.F0028_CONSUL_ERROR, e.message);
        });
      }));
      return _onInitialized.apply(this);
    };
  };
}
