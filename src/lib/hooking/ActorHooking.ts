import { ActorSheetHooking } from "../types/acoriPTypes";

function hookup(hooking: ActorSheetHooking): void {
    Hooks.on("renderActorSheet", hooking.render);
    Hooks.on("closeActorSheet", hooking.close);
}

export default { hookup }