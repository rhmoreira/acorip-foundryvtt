import {TokenSettingHelper} from "../../settings/PersistedSettingsHelper";
import { defaultRestrictFilePickerConfig, ToggleTokenImageSettingsData, DefaultTokenImageEquipmentFlag } from "../../types/acoriPTypes";
import { TokenImagePickerUI } from "../../app/TokenImagePickerUI";
import { DEFAULT_TOKEN_IMAGE_GEAR_FLAG, MODULE_ID } from "../../Constants";

export default class ToggleTokenImageHandler {

    private toggleOptionSettings: ToggleTokenImageSettingsData;

    constructor(private token: Token){
        let tokenSettingsHelper = new TokenSettingHelper();
        let isUserGM = game.user.isGM
        let hasTokenPlayerOwner = token.actor.hasPlayerOwner
        let gmToggleTokenSettings = tokenSettingsHelper.toggleTokenImageSetting
        let playerToggleTokenSettings = tokenSettingsHelper.playerToggleTokenImageSetting

        this.toggleOptionSettings = 
            (
                !isUserGM ? playerToggleTokenSettings :
                (isUserGM && hasTokenPlayerOwner ? playerToggleTokenSettings : gmToggleTokenSettings)
            ) as ToggleTokenImageSettingsData
    }

    public toggleTokenImage(): void{

        if (game.user.isGM) {
            new FilePicker({
                ...defaultRestrictFilePickerConfig,
                callback: this.applyStance.bind(this),
                displayMode: "tiles"
            }).render(true)
            .browse(`${this.toggleOptionSettings.defaultTokenImagePath}/${game.user.name}`);
        } else {
            new TokenImagePickerUI(
                `${this.toggleOptionSettings.defaultTokenImagePath}/${game.user.name}`,
                this.applyStance.bind(this)
            ).render(true)
        } 
    }

    public applyStance(path: string, setDefaultGear: boolean = false): void {
        this.changeTokenImage(path)
            .then(tokenUpdate => this.updateToken(tokenUpdate))
            .then(this.notifyChange.bind(this))
            .then(() => this.saveDefaultGear(path, setDefaultGear));
    }

    private async changeTokenImage(imagePath: string) {
        return {texture: {src: imagePath}};
    }

    private updateToken(updates: any): void {
        this.token.document.update(updates)
    }    

    private notifyChange(): void {
        let messageContent = { content: `<p>${game.i18n.format("acorip.messages.token.image-changed", {tokenName: this.token.name})}</p>` };
        ChatMessage.create(messageContent);
    }
    
    private saveDefaultGear(path: string, saveDefaultGear: boolean): void {
        if (saveDefaultGear) {
            let defaultImageFlag = ( (this.token.actor as any).getFlag(MODULE_ID, DEFAULT_TOKEN_IMAGE_GEAR_FLAG) as DefaultTokenImageEquipmentFlag[]) 
                                        ?? [] as DefaultTokenImageEquipmentFlag[];

            let defaultImageFlagMap = defaultImageFlag.reduce((map, defaultImage) => {
                return map.set(defaultImage.imagePath, defaultImage);
            }, new Map<string, DefaultTokenImageEquipmentFlag>());

            defaultImageFlagMap.set(path, {imagePath: path, equippedGear: this.getEquippedGear()});
            
            (this.token.actor as any).setFlag(MODULE_ID, DEFAULT_TOKEN_IMAGE_GEAR_FLAG, [...defaultImageFlagMap.values()]);
        }
        
    }

    public getEquippedGear(): string {
        return JSON.stringify(this.getEquippedGearIds());
    }

    private getEquippedGearIds(): string[] {
        return this.token
            .actor
            .items
            .filter( (item: any) => item.system.equipped == "equipped")
            .map( (gear: any) => gear.id)
            ?.sort();
    }

}