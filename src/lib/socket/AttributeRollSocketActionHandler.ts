import { SocketRequestAttributeRollActionData } from "../types/acoriPTypes";
import SocketActionHandler from "./SocketActionHandler";

export default class AttributeRollSocketActionHandler implements SocketActionHandler<"rollAttribute", SocketRequestAttributeRollActionData>{
    
    handle(data: SocketRequestAttributeRollActionData): void {
        data.action
    }
    getAction(): "rollAttribute" {
        return "rollAttribute";
    }
}