import { MODULE_ID } from "./Constants";

function info(...args: any[]): void {
    log(console.log, args);
}

function error(...args: any[]): void {
    log(console.error, args);
}

function warn(...args: any[]): void {
    log(console.warn, args);
}


function log(logFn: (...args: any[]) => void, args: any[]): void {
    let logConfig = (CONFIG as any).acorip?.logging;
    if (!!logConfig?.enabled)
        logFn(`${MODULE_ID} | `, ...args);
}

class AcoripLog {
    constructor(private caller: string) {}

    public info(...args: any[]): void {
        info(`${this.caller} | `, args)
    }
        
    public error(...args: any[]): void {
        error(`${this.caller} | `, args)
    }
    
    public warn(...args: any[]): void {
        warn(`${this.caller} | `, args)
    }
}

export {info, warn, error, AcoripLog}