export default class RestrictedFilePicker extends FilePicker  {
 
    private ready: boolean = false;
    
    constructor(
        private restrictedFolder: string,
        private restrictedTab: "data" | "public" = "data",
        private fileType: FilePicker.Type = "image"
    ){
        super();
    }
    
    protected override _render(force?: boolean, options?: Application.RenderOptions<FilePickerOptions>): Promise<void> {
        return Promise.resolve(super._render(force, options))
        .then(() => {
            if (!this.ready)
                this.navigateDefault();
        }).then(() => {this.ready = true});
    }
    
    private navigateDefault(): Promise<FilePicker.BrowseResult> {
        super.activateTab(this.restrictedTab);
        return super.browse(this.restrictedFolder);
    }

    override browse(target?: string, options?: FilePicker.BrowseOptions): Promise<FilePicker.BrowseResult> {
        return this.ready
            ? this.browseRestricted(target, options)
            : super.browse(target, options);
        
    }

    private browseRestricted(target?: string, options?: FilePicker.BrowseOptions): Promise<FilePicker.BrowseResult> {
        return target != "assets"
            ? this.navigateDefault()
            : super.browse(target, options);
    }

}