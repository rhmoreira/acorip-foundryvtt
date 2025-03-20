import { setSetting } from "../../settings/settingsHelper";
import { UpdateSettingsActionData } from "../../types/acoriPTypes";
import SocketActionHandler from "./SocketActionHandler";

export default class UpdateClientSettingsActionHandler implements SocketActionHandler<"updateSettings", UpdateSettingsActionData> {
    
    handle(update: UpdateSettingsActionData): void {
        let key = update.data.key;
        let updatedSettings = update.data.settings;

        if (!!key)
            setSetting(key, updatedSettings);
    }

    getAction(): "updateSettings" { return "updateSettings"};
}