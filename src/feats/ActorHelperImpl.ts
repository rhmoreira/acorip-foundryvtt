export default class ActorHelperImpl implements ActorHelper{
    
    constructor(private actor: Actor | any) {}

    public isBlackICE(): boolean {
        return this.actor.type === "blackIce";
    }
    public isNetrunner(): boolean {
        return this.isRole("Netrunner");
    }
    public isSolo(): boolean {
        return this.isRole("Solo");
    }
    public isLawman(): boolean {
        throw new Error("Method not implemented.");
    }
    public isMedtech(): boolean {
        throw new Error("Method not implemented.");
    }
    public isTech(): boolean {
        return this.isRole("Tech");
    }
    public isFixer(): boolean {
        throw new Error("Method not implemented.");
    }
    public isMedia(): boolean {
        throw new Error("Method not implemented.");
    }

    private isRole(roleName: string): boolean {
        return this.actor.system.roleInfo?.activeRole === roleName;
    }

}