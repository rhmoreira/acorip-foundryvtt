import { MODULE_ID } from "../Constants";
import BaseUI from "./BaseUI";

interface TokenImagePickerFormData {
    image: string
}

export class TokenImagePickerUI extends BaseUI {

    constructor(private path: string, private callback: (selectedImage: string) => void) {
        super("rhmToggleTokenImageUI");
    }

    static override get defaultOptions(): FormApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "rhmToggleTokenImageUI",
            classes: ["rhm", "rhm-toggle-token"],
            title: game.i18n.localize("acorip.features.token.toggle-image"),
            template: `modules/${MODULE_ID}/templates/token-toggle-image-dialog.hbs`,
            resizable: false,
            popOut: false,
        }
    }

    override async getData(_?: Partial<FormApplicationOptions>): Promise<any> {
        return new Promise( (resolve, _) =>{
            FilePicker
                .browse("data", this.path)
                .then(result => resolve({files: result.files}))
        });
        
    }

    override async _updateObject(event: any, formData?: TokenImagePickerFormData) {
        let action = $(event.submitter).data("action");

        switch (action) {
            case "confirm":
                this.validateSelectedImage(formData?.image)
                this.callback(formData?.image);
                break;        
            default:
                break;
        }
    }

    private validateSelectedImage(image: string): void {
        if (image == null) {
            ui.notifications.error("acorip.messages.token.image-required", {localize: true})
            throw Error(game.i18n.localize("acorip.messages.token.image-required"));
        }
    }
}