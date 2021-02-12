/**
 * 组件的基类
 */

export type ComponentConstructor = (new (...args: any[]) => Component);
const componentClasses: { [k: string]: ComponentConstructor } = {};
export type ifComponent = string | ComponentConstructor;
export class Component {
    name: string;

    static create(name: string) {
        if (componentClasses[name]) {
            throw new Error(` component name ${name} exists`);
        }
        return function (target) {
            target.prototype.name = name;
            componentClasses[name] = target;
        }
    }
    static is(component: Component, isComponent: ifComponent) {
        if (typeof isComponent == 'string') {
            return component.name == isComponent;
        }
        return component.name == isComponent.prototype.name;
    }
    static load(data: any): Component {
        const instance = new componentClasses[data.name];
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key) && instance.hasOwnProperty(key)) {
                const element = data[key];
                instance[key] = element[key];
            }
        }
        return instance;
    }
}
