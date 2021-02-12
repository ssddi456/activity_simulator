import { DeadComponent } from '../components/dead';
import { Entity } from '../lib/entity';
import { System } from '../lib/system';
import { World } from '../lib/world';


export const  DeadSystem: System = {
    filter(entities: Entity[]): Entity[] {
        return entities.filter((entity) => entity.withComponents([DeadComponent]))
    },
    update(entities: Entity[], world: World): void {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const deadComponent = entity.getComponent< DeadComponent>(DeadComponent);
            // or move to graveyard?
            world.removeEntity(entity);
        }
    }
}
