
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
        }
    }
}
