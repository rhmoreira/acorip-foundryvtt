import { AcoripLog } from "./AcoripLog";
import { MODULE_ID } from "./Constants";

const logger = new AcoripLog("CacheConfig");

function configure() {
    (CONFIG as any)[MODULE_ID] = {
        logging: {
            enabled: true
        }
    };

    (CONFIG as any)[MODULE_ID].settings = {};
    (CONFIG as any)[MODULE_ID].services = {};
}

function setConfigSetting(key: any, value: any) {
    logger.info(`Updating cached local settings ${key}=`, value);
    (CONFIG as any)[MODULE_ID].settings[key] = value;
}

function getConfigSetting(key: any) {
    return (CONFIG as any)[MODULE_ID].settings[key];
}

function setService(service: any) {
    logger.info(`Setting service [${service.constructor?.name}] as config`);
    (CONFIG as any)[MODULE_ID].services[service.constructor?.name] = service;
}

function getService<S>(service: new () => S): S {
    return (CONFIG as any)[MODULE_ID].services[service.name];
}

export {configure, setConfigSetting, getConfigSetting, setService, getService}