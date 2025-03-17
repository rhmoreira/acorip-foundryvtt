function registerHelpers(): void {
    Handlebars.registerHelper("upperCase", upperCase);
    Handlebars.registerHelper("_if", ifTernary);
}

function upperCase(value: string, _?: any): string {
    return value?.toUpperCase();
}

function ifTernary(condition: boolean, then_: any, else_: any, _?: any): any {
    return condition ? then_ : else_;
}

export default {registerHelpers}