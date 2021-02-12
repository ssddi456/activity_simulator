/**
 * <%= formatedName %> System
 */

import { <%= formatedName %>Component } from '../components/<%= name %>';
import { Entity } from '../lib/entity';
import { System } from '../lib/system';
import { World } from '../lib/world';


export const <%= formatedName %>System: System = {
    filter(entities: Entity[]): Entity[] {
        return entities.filter((entity) => entity.withComponents([<%= formatedName %>Component]))
    },
    update(entities: Entity[], world: World): void {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const <%= camelCaseName %>Component = entity.getComponent< <%= formatedName %>Component>(<%= formatedName %>Component);
        }
    }
}
