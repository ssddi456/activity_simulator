import { Component, ifComponent } from './component';

export class Entity {
    id: string;

    components: Component[];
    namedComponents: { [k: string]: Component }

    addComponent(component: Component) {
        this.components.push(component);
    }
    
    removeComponent(component: Component) {
        this.components.splice(this.components.indexOf(component));
    }

    addNamedComponent(name: string, component: Component) {
        this.namedComponents[name] = component;
    }

    getComponent<T extends Component>(isComponent: ifComponent): T {
        return this.components.filter((component) => {
            return Component.is(component, isComponent);
        })[0] as T;
    }
    getNamedComponent(name: string) {
        return this.namedComponents[name];
    }

    withComponents(components: ifComponent[]): boolean {
        return Entity.withComponents(this, components);
    }
    withAnyComponents(components: ifComponent[]): boolean {
        return Entity.withComponents(this, components);
    }

    static withComponents(entity: Entity, components: ifComponent[]) {
        for (let i = 0; i < components.length; i++) {
            let isComponent = components[i];
            let found = false;
            for (let index = 0; index < entity.components.length; index++) {
                const component = entity.components[index];
                if (Component.is(component, isComponent)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }
    static withAnyComponents(entity: Entity, components: ifComponent[]) {
        for (let i = 0; i < components.length; i++) {
            let isComponent = components[i];
            for (let index = 0; index < entity.components.length; index++) {
                const component = entity.components[index];
                if (Component.is(component, isComponent)) {
                    return true;
                }
            }
        }
        return false;
    }
}
