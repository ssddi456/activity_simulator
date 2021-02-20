
import { LifedComponent } from '../components/lifed';
import { Component } from '../lib/component';
import { Entity } from '../lib/entity';
import { System } from '../lib/system';
import { World } from '../lib/world';


export const LifedSystem: System = {
    filter(entities: Entity[]): Entity[] {
        return entities.filter((entity) => entity.withComponents([LifedComponent]))
    },
    update(entities: Entity[], world: World): void {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const lifedComponent = entity.getComponent<LifedComponent>(LifedComponent);

            if (lifedComponent.currentAge !== lifedComponent.maxAge) {
                lifedComponent.currentAge += 1;
            }

            if (lifedComponent.currentAge == lifedComponent.maxAge) {
                // 转变
                if (lifedComponent.transformTo instanceof Component) {
                    entity.components.push(lifedComponent.transformTo);
                }
                else if (Array.isArray(lifedComponent.transformTo)) {
                    for (let i = 0; i < lifedComponent.transformTo.length; i++) {
                        const element = lifedComponent.transformTo[i];
                        entity.components.push(element);
                    }
                } else if (typeof lifedComponent.transformTo == 'function') {
                    world.addEntity(lifedComponent.transformTo(entity), entity);
                }

                if (lifedComponent.remove) {
                    entity.removeComponent(lifedComponent);
                }

                if (lifedComponent.reset) {
                    lifedComponent.currentAge = 0;
                }
            }
        }
    }
}
