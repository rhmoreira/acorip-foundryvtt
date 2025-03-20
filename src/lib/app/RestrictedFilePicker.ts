import AcoripLog from "../AcoripLog";

export default class RestrictedFilePicker extends FilePicker  {
 
    private ready: boolean = false;
    private static INSTANCE: RestrictedFilePicker = null;

    constructor(
        private restrictedFolder: string,
        private restrictedTab: "data" | "public" = "data",
        private fileType: FilePicker.Type = "image"
    ){
        super();
        RestrictedFilePicker.INSTANCE = this;
    }
    
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
                .then(() => {delete RestrictedFilePicker.INSTANCE});
    }

    static override createDirectory(source: FilePicker.SourceType, target: string, options?: FilePicker.CreateDirectoryOptions): Promise<string> {
        if (source === RestrictedFilePicker.INSTANCE.restrictedTab && RestrictedFilePicker.INSTANCE.restrictedFolder.startsWith(target))
            super.createDirectory(source, target, options);
        else
            Promise.reject(Error("Directory creation unauthorized"))
    }


}