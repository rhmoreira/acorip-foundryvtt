import { SocketRequestRollActionData } from "../types/acoriPTypes";
import SocketActionHandler from "./SocketActionHandler";

export default class RequestRollSocketActionHandler implements SocketActionHandler<"requestRoll", SocketRequestRollActionData>{
    
    handle(data: SocketRequestRollActionData): void {
        data.action
    }
    getAction(): "requestRoll" {
        return "requestRoll";
    }
}