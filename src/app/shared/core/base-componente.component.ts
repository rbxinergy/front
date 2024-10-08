export class BaseComponent {

    protected getPermittedModules(): { module: string, actions: boolean[] }[] {
        const modules = sessionStorage.getItem('modules');
        return modules ? JSON.parse(modules) : [];
    }

    hasModule(moduleName: string): boolean {
        const permittedModules = this.getPermittedModules();
        const module = permittedModules.find(m => m.module === moduleName);
        return module ? module.actions.some(action => action) : false;
    }
}