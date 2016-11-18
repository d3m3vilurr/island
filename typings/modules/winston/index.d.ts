// Generated by typings
// Source: ../../../../../../github/npm-winston/lib/winston.d.ts
declare module 'winston' {
/**
 * This is just a template.
 * If the source does not export function at top level,
 * you can skip the declare namespace and export what's inside directly.
 */
namespace winston {
  interface AbstractConfigLevels {
    [key: string]: number;
  }

  interface AbstractConfigColors {
    [key: string]: string;
  }

  interface AbstractConfig {
    levels: AbstractConfigLevels;
    colors: AbstractConfigColors;
  }

  interface CliConfigLevels extends AbstractConfigLevels {
    error: number;
    warn: number;
    help: number;
    data: number;
    info: number;
    debug: number;
    prompt: number;
    verbose: number;
    input: number;
    silly: number;
  }

  interface CliConfigColors extends AbstractConfigColors {
    error: string;
    warn: string;
    help: string;
    data: string;
    info: string;
    debug: string;
    prompt: string;
    verbose: string;
    input: string;
    silly: string;
  }
  interface NpmConfigLevels extends AbstractConfigLevels {
    error: number;
    warn: number;
    info: number;
    verbose: number;
    debug: number;
    silly: number;
  }
  interface NpmConfigColors extends AbstractConfigColors {
    error: string;
    warn: string;
    info: string;
    verbose: string;
    debug: string;
    silly: string;
  }
  interface SyslogConfigLevels extends AbstractConfigLevels {
    emerg: number;
    alert: number;
    crit: number;
    error: number;
    warning: number;
    notice: number;
    info: number;
    debug: number;
  }
  interface SyslogConfigColors extends AbstractConfigColors {
    emerg: string;
    alert: string;
    crit: string;
    error: string;
    warning: string;
    notice: string;
    info: string;
    debug: string;
  }
  const config: {
    cli: {levels: CliConfigLevels, colors: CliConfigColors},
    npm: {levels: NpmConfigLevels, colors: NpmConfigColors},
    syslog: {levels: SyslogConfigLevels, colors: SyslogConfigColors}
  };
  var transports: Transports;
  var Transport: TransportStatic;
  var Logger: LoggerStatic;
  var Container: ContainerStatic;
  var loggers: ContainerInstance;
  var defaultLogger: LoggerInstance;

  var exception: Exception;

  var exitOnError: boolean;
  var level: string;

  var log: LogMethod;

  var debug: LeveledLogMethod;
  var info: LeveledLogMethod;
  var warn: LeveledLogMethod;
  var error: LeveledLogMethod;

  function query(options: QueryOptions, callback?: (err: Error, results: any) => void): any;
  function query(callback: (err: Error, results: any) => void): any;
  function stream(options?: any): NodeJS.ReadableStream;
  function handleExceptions(...transports: TransportInstance[]): void;
  function unhandleExceptions(...transports: TransportInstance[]): void;
  function add(transport: TransportInstance, options?: TransportOptions, created?: boolean): LoggerInstance;
  function clear(): void;
  function remove(transport: string): LoggerInstance;
  function remove(transport: TransportInstance): LoggerInstance;
  function startTimer(): ProfileHandler;
  function profile(id: string, msg?: string, meta?: any, callback?: (err: Error, level: string, msg: string, meta: any) => void): LoggerInstance;
  function addColors(target: AbstractConfigColors): any;
  function setLevels(target: AbstractConfigLevels): any;
  function cli(): LoggerInstance;
  function close(): void;

  interface ExceptionProcessInfo {
    pid: number;
    uid?: number;
    gid?: number;
    cwd: string;
    execPath: string;
    version: string;
    argv: string;
    memoryUsage: NodeJS.MemoryUsage;
  }

  interface ExceptionOsInfo {
    loadavg: [number, number, number];
    uptime: number;
  }

  interface ExceptionTrace {
    column: number;
    file: string;
    "function": string;
    line: number;
    method: string;
    native: boolean;
  }

  interface ExceptionAllInfo {
    date: Date;
    process: ExceptionProcessInfo;
    os: ExceptionOsInfo;
    trace: Array<ExceptionTrace>;
    stack: Array<string>;
  }

  interface Exception {
    getAllInfo(err: Error): ExceptionAllInfo;
    getProcessInfo(): ExceptionProcessInfo;
    getOsInfo(): ExceptionOsInfo;
    getTrace(err: Error): Array<ExceptionTrace>;
  }

  interface MetadataRewriter {
    (level: string, msg: string, meta: any): any;
  }

  interface MetadataFilter {
    (level: string, msg: string, meta: any): string | {msg: any; meta: any;};
  }

  interface LoggerStatic {
    new (options?: LoggerOptions): LoggerInstance;
  }

  interface LoggerInstance extends NodeJS.EventEmitter {
    rewriters: Array<MetadataRewriter>;
    filters: Array<MetadataFilter>;
    transports: {[key: string]: TransportInstance};

    extend(target: any): LoggerInstance;

    log: LogMethod;

    // for cli levels
    error: LeveledLogMethod;
    warn: LeveledLogMethod;
    help: LeveledLogMethod;
    data: LeveledLogMethod;
    info: LeveledLogMethod;
    debug: LeveledLogMethod;
    prompt: LeveledLogMethod;
    verbose: LeveledLogMethod;
    input: LeveledLogMethod;
    silly: LeveledLogMethod;

    // for syslog levels only
    emerg: LeveledLogMethod
    alert: LeveledLogMethod;
    crit: LeveledLogMethod;
    warning: LeveledLogMethod;
    notice: LeveledLogMethod;

    query(options: QueryOptions, callback?: (err: Error, results: any) => void): any;
    query(callback: (err: Error, results: any) => void): any;
    stream(options?: any): NodeJS.ReadableStream;
    close(): void;
    handleExceptions(...transports: TransportInstance[]): void;
    unhandleExceptions(...transports: TransportInstance[]): void;
    add(transport: TransportInstance, options?: TransportOptions, created?: boolean): LoggerInstance;
    clear(): void;
    remove(transport: TransportInstance): LoggerInstance;
    startTimer(): ProfileHandler;
    profile(id: string, msg?: string, meta?: any, callback?: (err: Error, level: string, msg: string, meta: any) => void): LoggerInstance;

    setLevels(target: AbstractConfigLevels): any;
    cli(): LoggerInstance;
    
    level: string;
  }

  interface LoggerOptions {
    transports?: TransportInstance[];
    rewriters?: TransportInstance[];
    exceptionHandlers?: TransportInstance[];
    handleExceptions?: boolean;
    level?: string;
    levels?: AbstractConfigLevels,

    /**
     * @type {(boolean|(err: Error) => void)}
     */
    exitOnError?: any;

    // TODO: Need to make instances specific,
    //       and need to get options for each instance.
    //       Unfortunately, the documentation is unhelpful.
    [optionName: string]: any;
  }

  interface TransportStatic {
    new (options?: TransportOptions): TransportInstance;
  }

  interface TransportInstance extends TransportStatic, NodeJS.EventEmitter {
    silent: boolean;

    formatQuery(query: (string | Object)): (string | Object);
    normalizeQuery(options: QueryOptions): QueryOptions;
    formatResults(results: (Object|Array<any>), options?: Object): (Object|Array<any>);
    logException(msg: string, meta: Object, callback: () => void): void;
  }

  interface ConsoleTransportInstance extends TransportInstance {
    new (options?: ConsoleTransportOptions): ConsoleTransportInstance;
  }

  interface DailyRotateFileTransportInstance extends TransportInstance {
    new (options?: DailyRotateFileTransportOptions): DailyRotateFileTransportInstance;
  }

  interface FileTransportInstance extends TransportInstance {
    new (options?: FileTransportOptions): FileTransportInstance;
    close(): void;
  }

  interface HttpTransportInstance extends TransportInstance {
    new (options?: HttpTransportOptions): HttpTransportInstance;
  }

  interface MemoryTransportInstance extends TransportInstance {
    new (options?: MemoryTransportOptions): MemoryTransportInstance;
  }

  interface WebhookTransportInstance extends TransportInstance {
    new (options?: WebhookTransportOptions): WebhookTransportInstance;
  }

  interface WinstonModuleTrasportInstance extends TransportInstance {
    new (options?: WinstonModuleTransportOptions): WinstonModuleTrasportInstance;
  }

  interface ContainerStatic {
    new (options: LoggerOptions): ContainerInstance;
  }

  interface ContainerInstance extends ContainerStatic {
    get(id: string, options?: LoggerOptions): LoggerInstance;
    add(id: string, options: LoggerOptions): LoggerInstance;
    has(id: string): boolean;
    close(id: string): void;
    options: LoggerOptions;
    loggers: {[key: string]: LoggerInstance};
    default: LoggerOptions;
  }

  interface Transports {
    File: FileTransportInstance;
    Console: ConsoleTransportInstance;
    Loggly: WinstonModuleTrasportInstance;
    DailyRotateFile: DailyRotateFileTransportInstance;
    Http: HttpTransportInstance;
    Memory: MemoryTransportInstance;
    Webhook: WebhookTransportInstance;
  }

  type TransportOptions = ConsoleTransportOptions|DailyRotateFileTransportOptions|FileTransportOptions|HttpTransportOptions|MemoryTransportOptions|WebhookTransportOptions|WinstonModuleTransportOptions;

  interface GenericTransportOptions {
    level?: string;
    silent?: boolean;
    raw?: boolean;
    name?: string;
    formatter?: Function;
    handleExceptions?: boolean;
    exceptionsLevel?: string;
    humanReadableUnhandledException?: boolean;
  }

  interface GenericTextTransportOptions {
    json?: boolean;
    colorize?: boolean;
    colors?: any;
    prettyPrint?: boolean;
    timestamp?: (Function|boolean);
    showLevel?: boolean;
    label?: string;
    depth?: number;
    stringify?: Function;
  }

  interface GenericNetworkTransportOptions {
    host?: string;
    port?: number;
    auth?: {
      username: string;
      password: string;
    };
    path?: string;
  }

  interface ConsoleTransportOptions extends GenericTransportOptions, GenericTextTransportOptions {
    logstash?: boolean;
    debugStdout?: boolean;
  }

  interface DailyRotateFileTransportOptions extends GenericTransportOptions, GenericTextTransportOptions {
    logstash?: boolean;
    maxsize?: number;
    maxFiles?: number;
    eol?: string;
    maxRetries?: number;
    datePattern?: string;
    filename?: string;
    dirname?: string;
    options?: {
      flags?: string;
      highWaterMark?: number;
    };
    stream?: NodeJS.WritableStream;
  }

  interface FileTransportOptions extends GenericTransportOptions, GenericTextTransportOptions {
    logstash?: boolean;
    maxsize?: number;
    rotationFormat?: boolean;
    zippedArchive?: boolean;
    maxFiles?: number;
    eol?: string;
    tailable?: boolean;
    maxRetries?: number;
    filename?: string;
    dirname?: string;
    options?: {
      flags?: string;
      highWaterMark?: number;
    };
    stream?: NodeJS.WritableStream;
  }

  interface HttpTransportOptions extends GenericTransportOptions, GenericNetworkTransportOptions {
    ssl?: boolean;
  }

  interface MemoryTransportOptions extends GenericTransportOptions, GenericTextTransportOptions {
  }

  interface WebhookTransportOptions extends GenericTransportOptions, GenericNetworkTransportOptions {
    method?: string;
    ssl?: {
      key?: any;
      cert?: any;
      ca: any;
    };
  }

  interface WinstonModuleTransportOptions extends GenericTransportOptions {
    [optionName: string]: any;
  }

  interface QueryOptions {
    rows?: number;
    limit?: number;
    start?: number;
    from?: Date;
    until?: Date;
    order?: "asc" | "desc";
    fields: any;
  }

  interface ProfileHandler {
    logger: LoggerInstance;
    start: Date;
    done: (msg: string) => LoggerInstance;
  }

  interface LogMethod {
    (level: string, msg: string, callback: LogCallback): LoggerInstance;
    (level: string, msg: string, meta: any, callback: LogCallback): LoggerInstance;
    (level: string, msg: string, ... meta: any[]): LoggerInstance;
  }

  interface LeveledLogMethod {
    (msg: string, callback: LogCallback): LoggerInstance;
    (msg: string, meta: any, callback: LogCallback): LoggerInstance;
    (msg: string, ... meta: any[]): LoggerInstance;
  }

  interface LogCallback {
    (error?: any, level?: string, msg?: string, meta?:any): void;
  }

}

export = winston;
}