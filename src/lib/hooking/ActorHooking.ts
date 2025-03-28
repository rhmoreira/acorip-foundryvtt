import { ActorSheetHooking } from "../types/acoriPTypes";

function hookup(hooking: ActorSheetHooking): void {
    Hooks.on("renderActorSheet", hooking.renderSheet);
    Hooks.on("closeActorSheet", hooking.closeSheet);
}

export default { hookup }