import { MaybePromise } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";

import { MODULE_ID } from "../Constants";
import ActorHooking from "../hooking/ActorHooking";
import BaseUI from "./BaseUI";
import { AcoripLog } from "../AcoripLog";

export default class ActorSheetSkillTooltip extends BaseUI {

    private logger: AcoripLog = new AcoripLog("ActorSheetSkillTooltip");
    private listening: boolean = false;
    private skillName: string;
    private skillDescription: string;

    constructor() {
        super("actorSheetSkillToolTip");
    }
    
    override async activateListeners(_: JQuery) {
        if (!this.listening) {
            let hoverTimeout: any = 0;

            let skillElement = document.querySelectorAll(".skills-container a[data-roll-type=skill]");
            skillElement.forEach(element => {
                element.addEventListener("mouseenter", (event: any) => {
                    hoverTimeout = setTimeout(() => {
                        this.skillName = $(event.target).data("roll-title");
                        this.skillDescription = game.i18n.localize(`acorip.tooltip.skills.${this.skillName.toLowerCase()}`);
                        this._render(true)
                            .then(_ =>{
                                logger.info(`Rendering tooltip for skill [${this.skillName}] `)
                                this.element[0].style.top = `${event.clientY}px`;
                                element.append(this.element[0]);
                            });
                    }, 1000);
                });

                element.addEventListener("mouseleave", (_) => {
                    $(".rhm.tooltip").remove();
                    clearTimeout(hoverTimeout);
                });
            });

            this.listening = true;
        }
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
        let skillTooltip = new ActorSheetSkillTooltip();
        ActorHooking.hookup({
            render: (_) => skillTooltip.render(true),
            close: (_) => skillTooltip.close()
        })
    }
}