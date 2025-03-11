import { SocketRollSkillActionData } from "../types/acoriPTypes";
import SocketActionHandler from "./SocketActionHandler";

export default class SkillRollSocketActionHandler implements SocketActionHandler<"rollSkill", SocketRollSkillActionData>{
    
    handle(data: SocketRollSkillActionData): void {
        data.action
    }
    getAction(): "rollSkill" {
        return "rollSkill";
    }
}