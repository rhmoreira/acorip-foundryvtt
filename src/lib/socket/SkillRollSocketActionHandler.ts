import { TEMPLATES } from "../Constants";
import { templateFactory } from "../TemplateFactory";
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

        let skillRoll = (skill as any).createRoll(skill.type, actor);

        skillRoll.handleRollDialog({}, actor, skill)
        .then( (confirmed: boolean) => {
            if (confirmed) {
                skillRoll
                    .roll()
                    .then(() => super.showMessageResult(this.createMessageRollParams(skillRoll)) )
            }
        });
    }

    private createMessageRollParams(skillRoll: any): any {
        return {
            rolledItem: skillRoll.skillName,
            rollType: "Skill",
            critSuccess: skillRoll._roll._total === 10,
            critFailure: skillRoll._roll._total === 1,
            firstRoll: skillRoll._roll._total,
            secondRoll: skillRoll._critRoll?._total,
            rollTotal: skillRoll.resultTotal,
            skillRoll: true,
            statName: skillRoll.statName,
            statValue: skillRoll.statValue,
            skillValue: skillRoll.skillValue,
            mods: skillRoll.mods.map( (mod: any) => mod.value).reduce((sum: number, value: number) => sum+value, 0)
        }
    }
}