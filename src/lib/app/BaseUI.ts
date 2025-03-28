import { UIControlHook } from "../types/acoriPTypes";

export default abstract class BaseUI extends FormApplication {

    private hooks: UIControlHook[] = [];
    protected _closed = false;
    public get isClosed(): boolean {return this._closed;};

    constructor(private uiControlPropertyName: string, private hasTabs: boolean = false) {

        super({});
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

    override close(_?: FormApplication.CloseOptions): Promise<void> {
        if (this.element[0]) this.element[0].remove();
        this.unhook();
        this._closed = true;
        return super.close();
    }

    override async activateListeners(html: JQuery) {
        super.activateListeners(html);
        
        if (this.hasTabs)
            this.toggleTabsActiveBehavior();        
    }

    protected override async _updateObject(_: Event, __?: object): Promise<unknown> { return true; }

    private toggleTabsActiveBehavior(): void {
        let jQElement = $(this.element[0]);
        let headerLabels = jQElement.find(".rhm.tag-header label.rhm-tab-label");
        headerLabels.on("click", event => {
            
            let label = $(event.target);
            $(headerLabels).removeClass("active");
            label.addClass("active");

            let content = label.data("content");
            $(".tab-current").removeClass(".tab-current").addClass("hide");
            $(content).addClass("tab-current").removeClass("hide")
        })
    }

    protected showMessage(messageProperty: string, type: "error" | "info" | "warn"): string {
        let localizedError = game.i18n.localize(messageProperty);
        ui.notifications[type](game.i18n.localize(localizedError));
        return localizedError;
    }
}