import { EmptyObject } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";

export default class RestrictedFilePicker extends FilePicker  {
 
    private ready: boolean = false;
    private static INSTANCE: RestrictedFilePicker = null;

    constructor(
        private restrictedFolder: string,
        private restrictedTab: "data" | "public" = "data",
        private restrictedFileExt: string = ".png",
        private fileType: FilePicker.Type = "image",
    ){
        super();
        RestrictedFilePicker.instance = this;
    }

    private static get instance(): RestrictedFilePicker {return RestrictedFilePicker.INSTANCE};
    private static set instance(instance: RestrictedFilePicker) {RestrictedFilePicker.INSTANCE = instance};
    
    protected override _render(force?: boolean, options?: Application.RenderOptions<FilePickerOptions>): Promise<void> {
        return Promise.resolve(super._render(force, options))
        .then(() => {
            if (!this.ready)
                this.navigateDefault();
        }).then(() => {this.ready = true});
    }
    
    private navigateDefault(): Promise<FilePicker.BrowseResult> {
        this.fileType;
        super.activateTab(this.restrictedTab);
        return super.browse(this.restrictedFolder);
    }

    override browse(target?: string, options?: FilePicker.BrowseOptions): Promise<FilePicker.BrowseResult> {
        return this.ready
            ? this.browseRestricted(target, options)
            : super.browse(target, options);
        
    }

    private browseRestricted(target?: string, options?: FilePicker.BrowseOptions): Promise<FilePicker.BrowseResult> {
        return this.restrictedFolder.startsWith(target ?? "")
            ? super.browse(target, options)
            : Promise.reject(Error(`Access restricted to unauthorized path >> ${target}`));
    }

    protected override _onChangeTab(_event: MouseEvent | null, _tabs: Tabs, active: this["activeSource"]): void {
        if (this.ready)
            if (active != this.restrictedTab)
                super.activateTab(this.restrictedTab);
    }

    override close(options?: Application.CloseOptions): Promise<void> {
        return super.close(options)
                .then(() => {RestrictedFilePicker.instance = null});
    }

    static override createDirectory(source: FilePicker.SourceType, target: string, options?: FilePicker.CreateDirectoryOptions): Promise<string> {
        if (RestrictedFilePicker.instance.areSourceAndTargetValid(source, target))
            return super.createDirectory(source, target, options);
        else
           return  Promise.reject(Error("Directory creation unauthorized"))
    }

    static override upload(source: FilePicker.SourceType, path: string, file: File, body?: FilePicker.UploadBody, options?: FilePicker.UploadOptions): Promise<FilePicker.UploadResult | false | void | EmptyObject> {
        console.log(file.name);
        if (RestrictedFilePicker.instance.areSourceAndTargetValid(source, path)){
            if (file.name.endsWith(RestrictedFilePicker.instance.restrictedFileExt))
                return super.upload(source, path, file, body, options);
            else
                ui.notifications.error(game.i18n.format('acorip.messages.token.invalid-image-type', {imageExt: RestrictedFilePicker.instance.restrictedFileExt}));
        } else{
            ui.notifications.error(game.i18n.format('acorip.messages.token.invalid-image-path', {path: RestrictedFilePicker.instance.restrictedFolder}));
        }
        return Promise.reject(Error('Uauthorized access or Invalid image'));
    }

    private areSourceAndTargetValid(source: FilePicker.SourceType, target: string): boolean {
        return source === this.restrictedTab && this.restrictedFolder === target;
    }


}