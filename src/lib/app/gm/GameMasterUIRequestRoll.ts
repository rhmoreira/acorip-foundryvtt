import { MODULE_ID, SETTINGS_CONF } from "../../Constants";
import { getSetting } from "../../settings/PersistedSettingsHelper";
import AcoripSocketHandler from "../../socket/AcoripSocketHandler";
import { SocketAction, SocketRequestRollActionData } from "../../types/acoriPTypes";
import BaseUI from "../BaseUI";

interface RequestRollFormData{
    userIds: string[];
    skill: keyof SocketAction;
    stat: string;
    diceFormula: string;
}

type Skill = {
    id: string,
    name: string,
}

type SkillGroup = {
    groupName: string,
    skills: Skill[]
}

export default class GameMasterUIRequestRoll extends BaseUI{

    private static SKILL_GROUP: SkillGroup[] = [];

    private static STATS: {
        statName: string,    
    }[] = [];

    constructor(isRender: boolean = false){
        super("rhmGMRequestRoll", true);
        this.render(isRender);
    }

    static override get defaultOptions(): FormApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "rhmGMRequestRoll",
            classes: ["rhm", "gm-controls"],
            title: game.i18n.localize("acorip.labels.request-player-roll"),
            template: `modules/${MODULE_ID}/templates/gm-roll-request.hbs`,
            resizable: false,
            popOut: true,
            height: 600,
            width: 800
        }
    }

    override async getData(_?: Partial<ApplicationOptions>): Promise<any> {
        let users = game.users.filter(u => (u as any).active && u.hasPlayerOwner);

        let extraSkills = (getSetting(SETTINGS_CONF.cutomSkillPacks) as string)
            ?.split("/(,|\s)/")
            ?.map(packIndexedName => GameMasterUIRequestRoll.loadPackSkills(packIndexedName, 'Extra Skills')) ?? [];
        return {
            users: users,
            skillGroup: [...GameMasterUIRequestRoll.SKILL_GROUP, ...extraSkills],
            stats: GameMasterUIRequestRoll.STATS
        }        
    }

    override async _updateObject(event: any, formData?: RequestRollFormData) {
        this.validateInput(formData.userIds, "acorip.messages.select-players");
        
        let action = $(event.submitter).data("action");
        let requestRoll: SocketRequestRollActionData = {
            action: "requestRoll",
            userIds: formData.userIds,
            request: undefined
        };

        switch (action) {
            case "rollSkill":
                this.setRollSkillRequest(formData, requestRoll);
                break;
            case "rollStat":
                this.setRollStatRequest(formData, requestRoll);
                break;
            case "rollDice":
                await this.setDiceRequest(formData, requestRoll);
                break;
            default:
                super.showMessage("acorip.messages.invalid-option", "error");
                throw Error("Invalid option");
        }
        
        this.sendAction(requestRoll);
    }

    private setRollSkillRequest(formData: RequestRollFormData, requestRoll: SocketRequestRollActionData): void {
        this.validateInput(formData.skill, "acorip.messages.select-skill");
        requestRoll.request = {
            action: "rollSkill",
            data: {skillName: formData.skill}
        };
    }

    private setRollStatRequest(formData: RequestRollFormData, requestRoll: SocketRequestRollActionData): void {
        this.validateInput(formData.stat, "acorip.messages.select-stat");
        requestRoll.request = {
            action: "rollAttribute",
            data: {attributeName: formData.stat}
        }
    }

    private async setDiceRequest(formData: RequestRollFormData, requestRoll: SocketRequestRollActionData) {
        this.validateInput(formData.diceFormula, "acorip.messages.dice-formula-required");

        return Roll.create(formData.diceFormula)
            .evaluate()
            .then(_ => {
                return requestRoll.request = {
                    action: "rollDice",
                    data: {formula: formData.diceFormula}
                };
            }).catch(error => {
                super.showMessage("acorip.messages.invalid-dice-formula", "error");
                throw error;
            });        
    }

    private sendAction(action: SocketRequestRollActionData): void {
        AcoripSocketHandler
            .getInstance()
            .emit(action);
    }

    private validateInput(input: any, errorMessage: string): void {
        if (!input) {
            let message = super.showMessage(errorMessage, "error");
            throw Error(message);
        }
    }

    public static init(): void {
        if(game.user.isGM) {
            this.loadStats();
            this.loadSkills();
        }
    }

    private static loadStats() {
        GameMasterUIRequestRoll.STATS = [
            { statName: "int" },
            { statName: "ref" },
            { statName: "dex" },
            { statName: "tech" },
            { statName: "cool" },
            { statName: "will" },
            { statName: "luck" },
            { statName: "move" },
            { statName: "body" },
            { statName: "emp" }
        ];
    }

    private static loadSkills() {
        GameMasterUIRequestRoll.SKILL_GROUP.push(this.loadPackSkills('cyberpunk-red-core.internal_skills', "Cyberpunk RED: Core"));
        GameMasterUIRequestRoll.SKILL_GROUP.push(this.loadPackSkills('cyberpunk-red-core.core_skills-languages', "Cyberpunk RED: Core"));
        GameMasterUIRequestRoll.SKILL_GROUP.push(this.loadPackSkills('cyberpunk-red-core.core_skills-martial-arts', "Cyberpunk RED: Core"));
        GameMasterUIRequestRoll.SKILL_GROUP.push(this.loadPackSkills('cyberpunk-red-core.core_skills-science', "Cyberpunk RED: Core"));
    }

    private static loadPackSkills(packIndexedName: string, groupNamePrefix: string = ""): SkillGroup {
        let skills = game.packs
            .get(packIndexedName)
            ?.index
            .filter(entry => (entry as any).type === 'skill')
            .map( ({_id: id, name}) => ({id, name}) )
            .sort( ({name: name1}, {name: name2}) => {
                if (name1 > name2) return 1;
                else if (name1 < name2) return -1;
                else return 0;
            });
        
        if (!!skills) {
            const compendiumName = game.packs.get(packIndexedName)?.metadata.label;
            return {groupName: `${groupNamePrefix} - ${compendiumName}`, skills}
        } else 
            return null
    }
}
