/**
 * Processor System
 */

import { LifedComponent } from '../components/lifed';
import { ProcessorComponent } from '../components/processor';
import { ReciptComponent } from '../components/recipt';
import { Entity } from '../lib/entity';
import { System } from '../lib/system';
import { World } from '../lib/world';


export const ProcessorSystem: System = {
    filter(entities: Entity[]): Entity[] {
        return entities.filter((entity) => entity.withComponents([ProcessorComponent, LifedComponent]))
    },
    update(entities: Entity[], world: World): void {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const processorComponent = entity.getComponent<ProcessorComponent>(ProcessorComponent);
            const lifedComponent = entity.getComponent<LifedComponent>(LifedComponent);

            const recipt = processorComponent.current_recipt;

            // 开始
            if (!lifedComponent.running && processorComponent.running) {
                lifedComponent.maxAge = recipt.getAge();
                lifedComponent.running = true;
            }

            // 结束
            if (lifedComponent.currentAge == lifedComponent.maxAge) {
                processorComponent.slot = undefined;
                processorComponent.running = false;
                recipt.generate(recipt.getItems()).forEach((result) => {
                    Array.isArray(result) ? world.addEntity(...result) : world.addEntity(result);
                });
            }
        }
    }
}
