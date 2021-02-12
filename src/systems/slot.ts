/**
 * Slot System
 */

import { SlotComponent } from '../components/slot';
import { Entity } from '../lib/entity';
import { System } from '../lib/system';
import { World } from '../lib/world';


export const SlotSystem: System = {
    filter(entities: Entity[]): Entity[] {
        return entities.filter((entity) => entity.withComponents([SlotComponent]))
    },
    update(entities: Entity[], world: World): void {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const slotComponent = entity.getComponent<SlotComponent>(SlotComponent);
        }
    }
}
