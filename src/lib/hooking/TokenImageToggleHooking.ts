import BaseItem from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents/item.mjs";
import { DEFAULT_TOKEN_IMAGE_GEAR_FLAG, MODULE_ID } from "../Constants";
import ToggleTokenImageHandler from "../token/service/ToggleTokenImageService";
import { DefaultTokenImageEquipmentFlag } from "../types/acoriPTypes";

function hookUp() {
    Hooks.on("updateItem", applyStance);
}

function applyStance(item: BaseItem) {
    if (item.parent.hasPlayerOwner && game.user?.character?.id == item.parent.id )
        changeTokenStance(item);
}

function changeTokenStance(item: BaseItem) {
    let actor = item.parent;
    let activeToken = actor.getActiveTokens();
    if (!!activeToken && activeToken.length > 0) {
        let tokenImageHandler = new ToggleTokenImageHandler(activeToken[0]);

        let imageGearFlag = (actor as any).getFlag(MODULE_ID, DEFAULT_TOKEN_IMAGE_GEAR_FLAG) as DefaultTokenImageEquipmentFlag[];
        if (imageGearFlag.length > 0) {
            let equippedGear = tokenImageHandler.getEquippedGear();
            let defaultEquipment = imageGearFlag.find( defaultEquip => defaultEquip.equippedGear === equippedGear);
            
            if (!!defaultEquipment)
                tokenImageHandler.applyStance(defaultEquipment.imagePath);
        }
    }
}

export default {hookUp}