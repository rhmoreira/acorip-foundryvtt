function registerHelpers(): void {
    Handlebars.registerHelper("upperCase", upperCase);
}

function upperCase(value: string, _?: any): string {
    return value?.toUpperCase();
}

export default {registerHelpers}