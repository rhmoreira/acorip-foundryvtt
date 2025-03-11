import { UIControlHook } from "../types/acoriPTypes";

export default abstract class UIControls extends Application {

    private hooks: UIControlHook[] = [];
    protected _closed = false;

    public get isClosed(): boolean {return this._closed;};

    constructor(private uiControlPropertyName: string) {
        super();
        (ui as any)[this.uiControlPropertyName]?.close();
        (ui as any)[this.uiControlPropertyName] = this;
    }

    protected hookUp(hooks: UIControlHook[]): void {
        hooks.forEach(it => {
            let hookId = Hooks.on(it.hook, it.callback)
            this.hooks.push({...it, hookId});
        });
    }

    private unhook(): void {
        this.hooks.forEach(it => Hooks.off(it.hook, it.hookId))
    }

    override close(_?: Application.CloseOptions): Promise<void> {
        if (this.element[0]) this.element[0].remove();
        this.unhook();
        this._closed = true;
        return super.close();
    }
}