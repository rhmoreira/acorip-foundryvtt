import { MODULE_ID } from "./Constants";

function info(...args: any[]): void {
    log(console.log, args);
}

function object(arg: any): void {
    console.log(arg);
}

function error(...args: any[]): void {
    log(console.error, args);
}

function log(logFn: (...args: any[]) => void, args: any[]): void {
    let logConfig = (CONFIG as any).acorip?.logging;
    if (!!logConfig?.enabled)
        logFn(`${MODULE_ID} | `, ...args);
}

export default {info, error, object}