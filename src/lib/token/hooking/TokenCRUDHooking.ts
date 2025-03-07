import { TokenCRUDHookCallbacks } from "../../types/acoriPTypes";

function hookUp(crudCallbacks: TokenCRUDHookCallbacks): void {
    Hooks.on("createToken", crudCallbacks.create);
    Hooks.on("deleteToken", crudCallbacks.delete);
}

export default { hookUp }