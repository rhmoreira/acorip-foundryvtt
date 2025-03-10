import { Fadeable } from "../../../feats/Fadeable";
import ActorHandlerImpl from "../../actor/ActorHandlerImpl";
import { FLAGS, MODULE_ID } from "../../Constants";
import { toggleJackEffect } from "../../service/NetrunningService";
import { DocumentType } from "../../types/acoriPTypes";
import ToggleTokenImageHandler from "./ToggleTokenImageService";

abstract class BaseTokenService implements Fadeable {
    
    constructor(private token: TokenDocument, protected actorHandler: ActorHandler = !!token.actor ? new ActorHandlerImpl(token.actor): null) {}

    public getDocumentName(): DocumentType {
        return this.getToken().documentName;
    }

    public createFadeUpdate(newAlpha: number): any {
        return {_id: this.token.id, alpha: newAlpha};
    }

    public getToken(): TokenDocument{
        return this.token;
    }

    public getId(): string {
        return this.getToken().id;
    }

    public getActorHandler(): ActorHandler {
        return this.actorHandler;
    }

    protected invalidate(): void {
        this.token.update({
            flags: {
                MODULE_ID: {
                    [FLAGS.INVALID_TOKEN]: true
                }
            }
        });
    }

    public setFlag(flag: string, value: any): void {
        this.token.setFlag(MODULE_ID, flag as never, value as never);
    }

    public getFlag(flag: string): any {
        return this.token.getFlag(MODULE_ID, flag as never);
    }

    public isOwner(user: User): boolean {
        return this.actorHandler?.getId() === user?.character.id;
    }
}

class TokenService extends BaseTokenService {
    
    constructor(token: TokenDocument) {
        super(token);
    }

    public jack(): void {
        let isNetrunning = this.getFlag(FLAGS.NETRUNNING);
        if (this.actorHandler?.isNetrunner()) {
            super.setFlag(FLAGS.NETRUNNING, !isNetrunning);
            toggleJackEffect(this.getToken());
        }
    }

    public toggleTokenImage(): void {
        new ToggleTokenImageHandler(this.getToken().object).toggleTokenImage();
    }
}

export {
    BaseTokenService,
    TokenService
}