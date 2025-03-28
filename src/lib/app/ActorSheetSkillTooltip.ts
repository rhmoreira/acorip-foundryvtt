import { MaybePromise } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";

import { MODULE_ID } from "../Constants";
import ActorHooking from "../hooking/ActorHooking";
import BaseUI from "./BaseUI";
import { AcoripLog } from "../AcoripLog";
import { ActorSheetHooking } from "../types/acoriPTypes";

export default class ActorSheetSkillTooltip extends BaseUI {

    private logger: AcoripLog = new AcoripLog("ActorSheetSkillTooltip");
    private listening: boolean = false;
    private skillName: string;
    private skillDescription: string;

    constructor() {
        super("actorSheetSkillToolTip");
        this.removeTooltip()
    }
    
    override async activateListeners(html: JQuery) {
        if (!this.listening) {
            //Remove the added compiled template from the html body
            //To be appended to the skill-div element on mouseenter event.
            html.remove();

            let hoverTimeout: any = 0;
            document.querySelectorAll(".skills-container a[data-roll-type=skill]")
                .forEach(element => {
                    element.addEventListener("mouseenter", (event: any) => {
                        hoverTimeout = setTimeout(() => this.showTooltip(element, event), 1000);
                    });

                    element.addEventListener("mouseleave", (_) => {
                        this.removeTooltip();
                        clearTimeout(hoverTimeout);
                    });
                });

            this.listening = true;
        }
    }

    private showTooltip(element: Element, event: any): void {
        this.skillName = $(event.target).data("roll-title");
        this.skillDescription = game.i18n.localize(`acorip.tooltip.skills.${this.skillName.toLowerCase()}`);

        this._render(true)
            .then(_ =>{
                this.logger.info(`Rendering tooltip for skill [${this.skillName}] `)
                this.element[0].style.top = `${event.clientY}px`;
                element.append(this.element[0]);
            });
    }

    private removeTooltip(): void {
        $(document).find(".rhm.tooltip").remove();
    }

    override close(_?: FormApplication.CloseOptions): Promise<void> {
        return Promise.resolve(this.removeTooltip())
                .then(_ => super.close());
    }

    override getData(_?: Partial<FormApplicationOptions>): MaybePromise<Object> {
        return {skillName: this.skillName, skillDescription: this.skillDescription};
    }

    static override get defaultOptions(): FormApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "actorSheetSkillToolTip",
            classes: ["rhm", "skill-tooltip"],
            template: `modules/${MODULE_ID}/templates/skill-tooltip.hbs`,
            resizable: false,
            popOut: false,
        }
    }

    public static init(): void {
        let control = new ActorSheetHookingControl();
        ActorHooking.hookup({
            renderSheet: control.renderSheet.bind(control),
            closeSheet: control.closeSheet.bind(control)
        });
    }
}

class ActorSheetHookingControl implements ActorSheetHooking {
    
    private sheetMap: Map<ActorSheet, ActorSheetSkillTooltip> = new Map();
    
    public renderSheet(sheet: ActorSheet): void {
        let skillToolip = new ActorSheetSkillTooltip();
        skillToolip.render(true);
        this.sheetMap.set(sheet, skillToolip);
    }
    public closeSheet(sheet: ActorSheet): void {
        let skillToolip = this.sheetMap.get(sheet);
        skillToolip?.close();
        this.sheetMap.delete(sheet);
        logger.info(this.sheetMap);
    }
}