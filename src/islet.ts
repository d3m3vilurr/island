/// <reference path="../typings/tsd.d.ts" />
import _ = require('lodash');
import fs = require('fs');
import Promise = require('bluebird');
import IAbstractAdapter = require('./adapters/interfaces/abstract-adapter-interface');
import ListenableAdapter = require('./adapters/listenable-adapter');

/**
 * Create a new Islet.
 * @abstract
 * @class
 */
class Islet {
  private static islet: Islet;

  /**
   * Register the islet which is the suite of micro-service
   * @param {Islet} islet
   * @static
   */
  private static registerIslet(islet: Islet) {
    if (Islet.islet) throw new Error('The islet already has been registered.');
    Islet.islet = islet;
  }

  /**
   * Retrieves a registered micro-service.
   * @returns {Microservice}
   * @static
   */
  public static getIslet(): Islet;
  public static getIslet<T>(): T;
  public static getIslet(): any {
    return Islet.islet;
  }

  /**
   * Instantiate and run a microservice.
   * @param {Microservice} Class
   * @static
   */
  public static run(Class: typeof Islet): Promise<any[]>;
  public static run(config: Promise<any>, Class: typeof Islet): Promise<any[]>;
  public static run(): Promise<any[]> {
    if (this.islet) return;

    var Class: typeof Islet;
    var config: Promise<any>;
    var args: any[] = Array.prototype.slice.call(arguments);

    if (args.length === 1) {
      Class = args[0];
      config = Promise.resolve();
    } else if (args.length > 1) {
      Class = args[1];
      config = args[0];
    }

    // Create such a micro-service instance.
    var islet = new Class();
    this.registerIslet(islet);

    return config.then(configure => {
      islet.main(configure);
      return islet.initialize().then(() => { return islet.start(); });
    });
  }

  /** @type {Object.<string, IAbstractAdapter>} [adapters={}] */
  private adapters: { [name: string]: IAbstractAdapter; } = {};

  /**
   * Register the adapter.
   * @param {string} name
   * @param {IAbstractAdapter} adapter
   */
  public registerAdapter(name: string, adapter: IAbstractAdapter) {
    if (this.adapters[name]) throw new Error('duplicated adapter');
    this.adapters[name] = adapter;
  }

  /**
   * @param {string} name
   * @returns {typeof Adapter}
   */
  public getAdaptee<T>(name: string): T;
  public getAdaptee(name: string): any;
  public getAdaptee(name: string): any {
    if (!this.adapters[name]) throw new Error('Missing adapter');
    return this.adapters[name].adaptee;
  }

  /**
   * @abstract
   * @param {any} config
   */
  public main(config: any) {
    throw new Error('Not implemented exception.');
  }

  /**
   * @returns {Promise<void>}
   */
  public initialize() {
    var adapters: IAbstractAdapter[] = _.values(this.adapters);
    return Promise.all<any>(adapters.map(adapter => { return adapter.initialize(); }));
  }

  /**
   * @returns {Promise<void>}
   */
  public start() {
    var adapters: ListenableAdapter<any, any>[] = _.values(this.adapters).filter(adapter => {
      return adapter instanceof ListenableAdapter;
    });

    // Initialize all of the adapters to register resource into routing table.
    adapters.forEach(adapter => {
      adapter.postInitialize();
    });

    return Promise.all<any>(adapters.map(adapter => {
      return adapter.listen();
    }))
  }
}

export = Islet;