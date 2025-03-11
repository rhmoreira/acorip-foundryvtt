import { SocketRollSkillActionData } from "../types/acoriPTypes";
import BaseRollActionHandler from "./BaseRollActionHandler";
import SocketActionHandler from "./SocketActionHandler";

export default class SkillRollSocketActionHandler extends BaseRollActionHandler implements SocketActionHandler<"rollSkill", SocketRollSkillActionData>{

    handle(data: SocketRollSkillActionData): void {
        super.requestRoll(
            game.i18n.localize("acorip.labels.skill"),
            data.data.skillName, 
            () => { this.rollSkill(data) }
        );
    }

    getAction(): "rollSkill" {
        return "rollSkill";
    }

    private rollSkill(data: SocketRollSkillActionData): void {
        let actor = game.user.character;
        let skill = game.user.character.items.find(i => (i.type as any) === "skill" && i.name === data.data.skillName);

        let skillRoll = (skill as any)._createSkillRoll(actor);

        skillRoll.handleRollDialog({}, actor, skill)
        .then( (confirmed: boolean) => {
            if (confirmed) {
                skillRoll
                    .roll()
                    .then(() => {
                        ChatMessage.create({
                            content: 
                                `<h2>Teste de '${skillRoll.skillName}' de <strong>(${actor.name})</strong></h2>
                                    <p> <strong>${skillRoll.statName}</strong>: ${skillRoll.statValue} </p>
                                    <p> <strong>${skillRoll.skillName}</strong>: ${skillRoll.skillValue} </p>
                                    <p> <strong>Mod</strong>: ${skillRoll.mods.map( (mod: any) => mod.value).reduce((sum: number, value: number) => sum+value, 0)} <p>
                                <h3><strong>Total</strong>: ${skillRoll.resultTotal}</h3>`
                            
                        })
                    })
            }
        });
    }
}