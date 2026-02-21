declare module 'mustache-bun/mustache.js' {
    export interface MustacheStatic {
        render(template: string, view: any, partials?: any, tags?: any): string;
        escape(text: string): string;
    }
    const mustache: MustacheStatic;
    export default mustache;
}
